using mf_backend.DataAccess;
using mf_backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;
using static System.Net.Mime.MediaTypeNames;


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

            if (_context.Accounts.Any(a => a.Username.ToLower() == account.Username.ToLower()) || _context.Accounts.Any(a => a.Email.ToLower() == account.Email.ToLower()))
            {
                return StatusCode(StatusCodes.Status401Unauthorized, "Username or Email already existed");
            }

            if (account != null && account.Username != null && account.Password != null && account.Avatar != null && account.Email != null && account.Fullname != null)
            {

                if (account.Username.Length < 5 || account.Username.Length > 16)
                {
                    return StatusCode(StatusCodes.Status405MethodNotAllowed, "Username must be from 5-16 characters");
                }

                if (account.Password.Length < 6 || account.Password.Length > 32)
                {
                    return StatusCode(StatusCodes.Status406NotAcceptable, "Password must be from 6-32 characters");
                }

                string avatarFileName = $"{Guid.NewGuid()}{Path.GetExtension(account.Avatar.FileName)}";
                string avatarDirectoryPath = Path.Combine(_environment.WebRootPath, "Images");
                string avatarFilePath = Path.Combine(avatarDirectoryPath, avatarFileName);

                if (!Directory.Exists(avatarDirectoryPath))
                {
                    Directory.CreateDirectory(avatarDirectoryPath);
                }

                var allowedContentTypes = new[] { "image/jpeg", "image/png", "image/gif", "image/jpg" };
                var contentType = account.Avatar.ContentType.ToLower();

                if (!allowedContentTypes.Contains(contentType))
                {
                    return StatusCode(StatusCodes.Status410Gone, "Invalid image format. Valid format (jpg, jpeg, gif or png)");
                }

                using (var stream = new FileStream(avatarFilePath, FileMode.Create))
                {
                    account.Avatar.CopyTo(stream);
                }

                string hashedPassword = BCrypt.Net.BCrypt.HashPassword(account.Password);

                _context.Add(new Account
                {
                    Username = account.Username,
                    Password = hashedPassword,
                    Avatar = avatarFileName,
                    Email = account.Email,
                    Fullname = account.Fullname,
                    Gender = account.Gender
                });

                _context.SaveChanges();
                return StatusCode(StatusCodes.Status200OK, account);
            }
            else
            {
                return StatusCode(StatusCodes.Status404NotFound, "Account data must not empty");
            }
        }

    }
}
