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
    [Route("api/mf/maps")]
    [ApiController]
    public class MapController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _environment;

        public MapController(ApplicationDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        // GET: api/mf/maps
        [HttpGet]
        public async Task<IActionResult> GetMaps()
        {
            var maps = await _context.Maps.ToListAsync();
            return Ok(maps);
        }

        // GET: api/mf/maps/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMap(int id)
        {
            var map = await _context.Maps.FindAsync(id);
            if (map == null)
            {
                return NotFound("Map could not be found");
            }
            return Ok(map);
        }

        // POST: api/mf/maps
        [HttpPost]
        public async Task<IActionResult> CreateMap([FromForm] MapActionModel mapModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var map = new Map
            {
                MapName = mapModel.MapName,
                Level = mapModel.Level,
                LevelRequirement = mapModel.LevelRequirement,
                Description = mapModel.Description,
                Type = mapModel.Type,
                Exp = mapModel.Exp,
                AmountItem = mapModel.AmountItem,
                Silver = mapModel.Silver,
                ItemId = mapModel.ItemId
            };

            if (mapModel.ImagePath != null)
            {
                var imageUrl = await SaveImage(mapModel.ImagePath);
                if (imageUrl.Equals(string.Empty))
                {
                    return StatusCode(StatusCodes.Status405MethodNotAllowed, "Invalid image format.Valid format (png, jpg, gif or jpeg)");
                }
                map.ImagePath = imageUrl;
            }

            _context.Maps.Add(map);
            await _context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, map);
        }

        // PUT: api/mf/maps/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMap(int id, [FromForm] MapActionModel mapModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var map = await _context.Maps.FindAsync(id);
            if (map == null)
            {
                return NotFound();
            }

            map.MapName = mapModel.MapName;
            map.Level = mapModel.Level;
            map.LevelRequirement = mapModel.LevelRequirement;
            map.Description = mapModel.Description;
            map.Type = mapModel.Type;
            map.Exp = mapModel.Exp;
            map.AmountItem = mapModel.AmountItem;
            map.Silver = mapModel.Silver;
            map.ItemId = mapModel.ItemId;

            if (mapModel.ImagePath != null)
            {
                var imageUrl = await SaveImage(mapModel.ImagePath);
                if (imageUrl.Equals(string.Empty))
                {
                    return StatusCode(StatusCodes.Status405MethodNotAllowed, "Invalid image format.Valid format (png, jpg, gif or jpeg)");
                }
                map.ImagePath = imageUrl;
            }

            _context.Entry(map).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return StatusCode(StatusCodes.Status202Accepted);
        }


        // DELETE: api/mf/maps/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMap(int id)
        {
            var map = await _context.Maps.FindAsync(id);
            if (map == null)
            {
                return NotFound();
            }

            _context.Maps.Remove(map);
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
