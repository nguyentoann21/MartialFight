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
                return BadRequest("Username or Email already existed");
            }

            if (account.Username == null || account.AvatarUrl == null || account.Fullname == null || account.Email == null || account.Password == null)
            {
                return BadRequest("All fields are required");
            }

            if (account != null && account.Username != null && account.Password != null && account.AvatarUrl != null && account.Email != null && account.Fullname != null)
            {

                if (account.Username.Length < 5 || account.Username.Length > 16)
                {
                    return BadRequest("Username must be from 5-16 characters");
                }

                if (account.Password.Length < 6 || account.Password.Length > 32)
                {
                    return BadRequest("Password must be from 6-32 characters");
                }   

                string avatarFileName = $"{Guid.NewGuid()}{Path.GetExtension(account.AvatarUrl.FileName)}";
                string avatarDirectoryPath = Path.Combine(_environment.WebRootPath, "Images");
                string avatarFilePath = Path.Combine(avatarDirectoryPath, avatarFileName);

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
                return BadRequest("Account data must not empty");
            }
        }

    }
}
