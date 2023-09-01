using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using mf_backend.DataAccess;
using mf_backend.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

namespace mf_backend.Controllers
{
    [Route("api/mf/sects")]
    [ApiController]
    public class SectController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _environment;

        public SectController(ApplicationDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        // GET: api/mf/sects
        [HttpGet]
        public async Task<IActionResult> GetSects()
        {
            var sects = await _context.Sects.ToListAsync();
            return Ok(sects);
        }

        // GET: api/mf/sects/sect
        // Get all sects that not contain the id with name unknown
        [HttpGet("sect")]
        public async Task<IActionResult> GetSectNotUnknown()
        {
            var sects = await _context.Sects.Where(sect => sect.SectId != 5).ToListAsync();
            return Ok(sects);
        }

        // GET: api/mf/sects/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSect(int id)
        {
            var sect = await _context.Sects.FindAsync(id);
            if (sect == null)
            {
                return NotFound("Sect could not be found");
            }
            return Ok(sect);
        }

        // POST: api/mf/sects
        [HttpPost]
        public async Task<IActionResult> CreateSect([FromForm] SectActionModel sectModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var sect = new Sect
            {
                SectName = sectModel.SectName,
                Description = sectModel.Description,
            };

            if (sectModel.ImagePath != null)
            {
                var imageUrl = await SaveImage(sectModel.ImagePath);
                if (imageUrl.Equals(string.Empty))
                {
                    return StatusCode(StatusCodes.Status405MethodNotAllowed, "Invalid image format.Valid format (png, jpg, gif or jpeg)");
                }
                sect.ImagePath = imageUrl;
            }

            _context.Sects.Add(sect);
            await _context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, sect);
        }

        // PUT: api/mf/sects/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSect(int id, [FromForm] SectActionModel sectModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var sect = await _context.Sects.FindAsync(id);
            if (sect == null)
            {
                return NotFound();
            }

            sect.SectName = sectModel.SectName;
            sect.Description = sectModel.Description;

            if (sectModel.ImagePath != null)
            {
                var imageUrl = await SaveImage(sectModel.ImagePath);
                if (imageUrl.Equals(string.Empty))
                {
                    return StatusCode(StatusCodes.Status405MethodNotAllowed, "Invalid image format.Valid format (png, jpg, gif or jpeg)");
                }
                sect.ImagePath = imageUrl;
            }

            _context.Entry(sect).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return StatusCode(StatusCodes.Status202Accepted);
        }

        // DELETE: api/mf/sects/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSect(int id)
        {
            var sect = await _context.Sects.FindAsync(id);
            if (sect == null)
            {
                return NotFound();
            }

            bool isReferencedItem = await _context.Items.AnyAsync(item => item.SectId == id);
            bool isReferencedCharacter = await _context.Characters.AnyAsync(character => character.SectId == id);

            if (isReferencedCharacter)
            {
                return StatusCode(StatusCodes.Status406NotAcceptable, "Cannot delete the category because it is referenced by characters");
            }

            if (isReferencedItem)
            {
                return StatusCode(StatusCodes.Status409Conflict, "Cannot delete the category because it is referenced by items");
            }
            
            _context.Sects.Remove(sect);
            await _context.SaveChangesAsync();

            return Ok("Delete successful");
        }

        private async Task<string> SaveImage(IFormFile image)
        {
            var imagesDirectory = Path.Combine(_environment.WebRootPath, "Images");
            Directory.CreateDirectory(imagesDirectory);

            var allowedContentTypes = new[] { "image/jpeg", "image/png", "image/gif", "image/jpg" };
            var contentType = image.ContentType.ToLower();

            if (!allowedContentTypes.Contains(contentType))
            {
                return string.Empty;
            }

            var extension = Path.GetExtension(image.FileName).ToLower();
            var imageFileName = $"{Guid.NewGuid()}{extension}";
            var imagePath = Path.Combine(imagesDirectory, imageFileName);

            using (var stream = new FileStream(imagePath, FileMode.Create))
                await image.CopyToAsync(stream);

            return imageFileName;
        }
    }
}
