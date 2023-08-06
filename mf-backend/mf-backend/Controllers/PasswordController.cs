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

            return StatusCode(StatusCodes.Status200OK, "The password has been changed successfully");
        }
    }
}
