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

            if (sectModel.Images != null && sectModel.Images.Count > 0)
            {
                var imageUrls = await SaveImages(sectModel.Images);
                sect.Images = string.Join(",", imageUrls);
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

            if (sectModel.Images != null && sectModel.Images.Count > 0)
            {
                var imageUrls = await SaveImages(sectModel.Images);
                sect.Images = string.Join(",", imageUrls);
            }

            _context.Entry(sect).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK);
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

            _context.Sects.Remove(sect);
            await _context.SaveChangesAsync();

            return Ok("Delete successful");
        }

        private async Task<string[]> SaveImages(List<IFormFile> images)
        {
            var imageUrls = new string[images.Count];
            var sectImagesDirectory = Path.Combine(_environment.WebRootPath, "Sects");

            if (!Directory.Exists(sectImagesDirectory))
            {
                Directory.CreateDirectory(sectImagesDirectory);
            }

            for (var i = 0; i < images.Count; i++)
            {
                var imageFile = images[i];
                var imageFileName = $"{Guid.NewGuid()}{Path.GetExtension(imageFile.FileName)}";
                var imagePath = Path.Combine(sectImagesDirectory, imageFileName);

                using (var stream = new FileStream(imagePath, FileMode.Create))
                {
                    await imageFile.CopyToAsync(stream);
                }

                imageUrls[i] = Path.Combine("Sects", imageFileName);
            }

            return imageUrls;
        }
    }
}
