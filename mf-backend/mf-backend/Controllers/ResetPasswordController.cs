using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MimeKit;
using MailKit.Net.Smtp;
using MailKit.Security;
using System;
using System.Threading.Tasks;
using mf_backend.Models;
using mf_backend.DataAccess;
using Microsoft.AspNetCore.Http;

namespace mf_backend.Controllers
{
    [Route("api/mf/")]
    [ApiController]
    public class ResetPasswordController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ResetPasswordController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("send-code")]
        public async Task<IActionResult> SendCode(string email)
        {
            try
            {
                string EMAIL_SEND = "toannvce150811@fpt.edu.vn";
                string PASSWORD_SEND = "ekpnpruomnfjknvq";
                var account = await _context.Accounts.FirstOrDefaultAsync(a => a.Email.ToLower() == email.ToLower());
                if (account == null)
                {
                    return NotFound("Email does not found");
                }
                var random = new Random();
                string randCode = random.Next(100000, 999999).ToString();
                var message = new MimeMessage();
                message.From.Add(new MailboxAddress("Verify Code", EMAIL_SEND));
                message.To.Add(new MailboxAddress("Receive Code", email));
                message.Subject = "Reset Password Verification Code";

                var bodyBuilder = new BodyBuilder();
                bodyBuilder.TextBody = $"Your reset password verification code is: {randCode}";
                message.Body = bodyBuilder.ToMessageBody();

                using var client = new SmtpClient();
                await client.ConnectAsync("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
                await client.AuthenticateAsync(EMAIL_SEND, PASSWORD_SEND);
                await client.SendAsync(message);
                await client.DisconnectAsync(true);
                account.ResetCode = randCode;
                _context.Entry(account).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return StatusCode(StatusCodes.Status202Accepted, "Reset password verification code sent successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error sending email: {ex.Message}");
            }
        }

        [HttpPost("verify-code")]
        public async Task<IActionResult> VerifyCode(string email, string code)
        {
            try
            {
                var account = await _context.Accounts.FirstOrDefaultAsync(a => a.Email.ToLower() == email.ToLower());
                if (account == null)
                {
                    return NotFound("Email does not found");
                }

                if (account.ResetCode == code)
                {
                    return StatusCode(StatusCodes.Status200OK, "Success");
                }
                else
                {
                    return StatusCode(StatusCodes.Status406NotAcceptable, "Verify code is invalid");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred: {ex.Message}");
            }
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword(string email, string code, string newPassword)
        {
            try
            {
                if (string.IsNullOrEmpty(newPassword) || newPassword.Length < 6 || newPassword.Length > 32)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, "New password must be from 6 to 32 characters");
                }

if (newPassword.StartsWith(" ") || newPassword.EndsWith(" "))
        {
            return StatusCode(StatusCodes.Status400BadRequest, "New password must not start or end with whitespace");
        }

                var account = await _context.Accounts.FirstOrDefaultAsync(a => a.Email.ToLower() == email.ToLower());
                if (account == null)
                {
                    return StatusCode(StatusCodes.Status404NotFound, "Email does not found");
                }

                if (account.ResetCode == code)
                {
                    string hashedPassword = BCrypt.Net.BCrypt.HashPassword(newPassword);
                    account.Password = hashedPassword;
                    account.ResetCode = "";
                    _context.Entry(account).State = EntityState.Modified;
                    await _context.SaveChangesAsync();

                    return StatusCode(StatusCodes.Status200OK, "Password reset successfully");
                }
                else
                {
                    return StatusCode(StatusCodes.Status409Conflict, "Invalid verification code");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred: {ex.Message}");
            }
        }
    }
}
