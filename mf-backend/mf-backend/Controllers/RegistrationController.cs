using mf_backend.DataAccess;
using mf_backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace mf_backend.Controllers
{
    [Route("api/mf/")]
    [ApiController]
    public class RegistrationController : ControllerBase
    { 

        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _environment;

        public RegistrationController(ApplicationDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        [HttpPost("sign-up")]
        public IActionResult Register([FromForm] RegisterModel account)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (_context.Accounts.Any(a => a.Username == account.Username) || _context.Accounts.Any(a => a.Email == account.Email))
            {
                return StatusCode(StatusCodes.Status401Unauthorized);
            }

            if (account != null && account.Username != null && account.Password != null && account.AvatarUrl != null)
            {
                string avatarFileName = $"{Guid.NewGuid()}{Path.GetExtension(account.AvatarUrl.FileName)}";
                string avatarDirectoryPath = Path.Combine(_environment.WebRootPath, "Images");
                string avatarFilePath = Path.Combine(avatarDirectoryPath, avatarFileName);

                // Ensure that the target directory exists
                if (!Directory.Exists(avatarDirectoryPath))
                {
                    Directory.CreateDirectory(avatarDirectoryPath);
                }

                using (var stream = new FileStream(avatarFilePath, FileMode.Create))
                {
                    account.AvatarUrl.CopyTo(stream);
                }

                _context.Add(new Account
                {
                    Username = account.Username,
                    Password = account.Password,
                    AvatarUrl = avatarFileName,
                    Email = account.Email,
                    Fullname = account.Fullname,
                    Gender = account.Gender
                });

                _context.SaveChanges();
                return StatusCode(StatusCodes.Status200OK, account);
            }
            else
            {
                return BadRequest();
            }
        }

    }
}
