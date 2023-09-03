using mf_backend.DataAccess;
using mf_backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace mf_backend.Controllers
{
    [Route("api/mf/")]
    [ApiController]
    public class UpdateProfileController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _environment;

        public UpdateProfileController(ApplicationDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        [HttpPut("update-profile")]
        public async Task<IActionResult> UpdateProfile([FromQuery] int id, [FromForm] UpdateProfileModel profileModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var account = await _context.Accounts.FindAsync(id);
            if (account == null)
            {
                return NotFound();
            }

            bool isUpdated = false; 

            if (profileModel != null)
            {
                if (profileModel.Email != null && profileModel.Email != account.Email)
                {
                    if (await _context.Accounts.AnyAsync(a => a.AccountId != id && a.Email.ToLower() == profileModel.Email.ToLower()))
                    {
                        return StatusCode(StatusCodes.Status401Unauthorized, "Email already exists for another account");
                    }

                    account.Email = profileModel.Email;
                    isUpdated = true;
                }

                if (profileModel.Fullname != null && profileModel.Fullname != account.Fullname)
                {
                    account.Fullname = profileModel.Fullname;
                    isUpdated = true;
                }

                if (profileModel.Gender != null && profileModel.Gender != account.Gender)
                {
                    account.Gender = profileModel.Gender;
                    isUpdated = true;
                }

                if (profileModel.Avatar != null)
                {
                    var imageUrl = await SaveImage(profileModel.Avatar);
                    if (imageUrl.Equals(string.Empty))
                    {
                        return StatusCode(StatusCodes.Status405MethodNotAllowed, "Invalid image format.Valid format (png, jpg, gif or jpeg)");
                    }
                    account.Avatar = imageUrl;
                    isUpdated = true;
                }
            }

            if (isUpdated)
            {
                _context.Entry(account).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return StatusCode(StatusCodes.Status200OK);
            }
            else
            {
                return StatusCode(StatusCodes.Status409Conflict, "No changes to update");
            }
        }

        private async Task<string> SaveImage(IFormFile avatar)
        {
            string imageUrls;
            string avatarFileName = $"{Path.GetRandomFileName()}{Path.GetExtension(avatar.FileName)}";
            string avatarDirectoryPath = Path.Combine(_environment.WebRootPath, "Images");
            string avatarFilePath = Path.Combine(avatarDirectoryPath, avatarFileName);

            if (!Directory.Exists(avatarDirectoryPath))
            {
                Directory.CreateDirectory(avatarDirectoryPath);
            }

            using (var stream = new FileStream(avatarFilePath, FileMode.Create))
            {
                await avatar.CopyToAsync(stream);
            }

            var allowedContentTypes = new[] { "image/jpeg", "image/png", "image/gif", "image/jpg" };
            var contentType = avatar.ContentType.ToLower();

            if (!allowedContentTypes.Contains(contentType))
            {
                return string.Empty;
            }

            imageUrls = avatarFileName;
            return imageUrls;
        }
    }
}
