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
                SectDescription = sectModel.SectDescription,
            };

            if (sectModel.Image != null)
            {
                var imageUrl = await SaveImage(sectModel.Image);
                sect.Image = imageUrl;
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
            sect.SectDescription = sectModel.SectDescription;

            if (sectModel.Image != null)
            {
                var imageUrl = await SaveImage(sectModel.Image);
                sect.Image = imageUrl;
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

            bool isReferencedItem = await _context.Items.AnyAsync(item => item.SectID == id);
            bool isReferencedCharacter = await _context.Characters.AnyAsync(character => character.SectID == id);

            if (isReferencedItem)
            {
                return StatusCode(StatusCodes.Status409Conflict, "Cannot delete the category because it is referenced by items");
            }
            if (isReferencedCharacter)
            {
                return StatusCode(StatusCodes.Status406NotAcceptable, "Cannot delete the category because it is referenced by characters");
            }

            _context.Sects.Remove(sect);
            await _context.SaveChangesAsync();

            return Ok("Delete successful");
        }

        private async Task<string> SaveImage(IFormFile image)
        {
            var sectImagesDirectory = Path.Combine(_environment.WebRootPath, "Sects");

            if (!Directory.Exists(sectImagesDirectory))
            {
                Directory.CreateDirectory(sectImagesDirectory);
            }

            var imageFileName = $"{Guid.NewGuid()}{Path.GetExtension(image.FileName)}";
            var imagePath = Path.Combine(sectImagesDirectory, imageFileName);

            using (var stream = new FileStream(imagePath, FileMode.Create))
            {
                await image.CopyToAsync(stream);
            }

            return Path.Combine("Sects", imageFileName);
        }
    }
}
