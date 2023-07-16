using mf_backend.DataAccess;
using mf_backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net.Mail;

namespace mf_backend.Controllers
{
    [Route("api/mf/")]
    [ApiController]
    public class PasswordController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PasswordController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePassword(ChangePasswordModel requestChange)
        {
            var account = await _context.Accounts.FirstOrDefaultAsync(x => x.AccountID == requestChange.AccountID);
            if (account == null)
            {
                return NotFound("Account does not exist");
            }

            bool isCurrentPassword = BCrypt.Net.BCrypt.Verify(requestChange.CurrentPassword, account.Password);

            if (!isCurrentPassword)
            {
                return Unauthorized("The current password incorrect");
            }

            if (requestChange.NewPassword == requestChange.CurrentPassword)
            {
                return StatusCode(StatusCodes.Status406NotAcceptable, "New password cannot be same as the current password");
            }

            if (requestChange.NewPassword.Length < 6 || requestChange.NewPassword.Length > 32)
            {
                return StatusCode(StatusCodes.Status411LengthRequired, "The password length must be from 6-32 characters");
            }

            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(requestChange.NewPassword);
            account.Password = hashedPassword;

            _context.Accounts.Update(account);
            await _context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "The password has been changed successfully.");
        }

        [HttpPost("send-verify-code")]
        public IActionResult SendVerificationCode([FromBody] string email)
        {
            if (!IsValidEmail(email))
            {
                return StatusCode(StatusCodes.Status403Forbidden, "Invalid email format");
            }
            string verifyCode = GenerateVerifyCode();
            SendVerifyCode(email, verifyCode);
            return StatusCode(StatusCodes.Status200OK, "Verify code sent successfully");
        }

        [HttpPost("verify-code")]
        public IActionResult VerifyCode([FromBody] VerifyCodeModel model)
        {
            string email = model.Email;
            string verifyCode = model.VerifyCode;
            bool isValidCode = ValidateVerifyCode(email, verifyCode);

            if (isValidCode)
            {
                var account = _context.Accounts.FirstOrDefault(u => u.Email == email);
                if (account == null)
                {
                    return StatusCode(StatusCodes.Status404NotFound, "Account does not found");
                }
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status202Accepted, "Verify code is valid");
            }
            else
            {
                return StatusCode(StatusCodes.Status405MethodNotAllowed, "Invalid verify code");
            }
        }

        [HttpPost("reset-password")]
        public IActionResult ResetPassword([FromBody] ResetPasswordModel model)
        {
            string email = model.Email;
            string newPassword = model.NewPassword;
            if (IsValidPassword(newPassword))
            {
                return StatusCode(StatusCodes.Status202Accepted, "Password has been reset successfully");
            }
            else
            {
                return StatusCode(StatusCodes.Status406NotAcceptable, "The password length must be from 6-32 characters");
            }
        }

        private string GenerateVerifyCode()
        {
            return new Random().Next(100000, 999999).ToString();
        }

        private bool ValidateVerifyCode(string email, string verifyCode)
        {
            var storeVerifyCode = _context.VerifyCodes.FirstOrDefault(v => v.Email == email);
            if (storeVerifyCode == null)
            {
                return false;
            }
            if(storeVerifyCode.Code == verifyCode && DateTime.UtcNow <= storeVerifyCode.Ex_Time) 
            { 
                return true;
            }
            else
            {
                return false;
            }
        }

        private void SendVerifyCode(string email, string verifyCode)
        {
            SmtpClient smtpClient = new SmtpClient("smtp.example.com");
            MailMessage message = new MailMessage();
            message.To.Add(email);
            message.Subject = "The forgot password verify code";
            message.Body = $"Your verification code is: {verifyCode}";
            message.Priority = MailPriority.High;
            smtpClient.Send(message);
        }

        private bool IsValidEmail(string email)
        {
            return email.Contains("@") && email.Contains(".");
        }

        private bool IsValidPassword(string password)
        {
            return password.Length >= 6 && password.Length <= 32;
        }
    }
}
