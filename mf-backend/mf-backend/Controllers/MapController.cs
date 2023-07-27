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
                MapDescription = mapModel.MapDescription
            };

            if (mapModel.Image != null)
            {
                var imageUrl = await SaveImage(mapModel.Image);
                map.Image = imageUrl;
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
            map.MapDescription = mapModel.MapDescription;

            if (mapModel.Image != null)
            {
                var imageUrl = await SaveImage(mapModel.Image);
                map.Image = imageUrl;
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
            var mapImagesDirectory = Path.Combine(_environment.WebRootPath, "Maps");
            if (!Directory.Exists(mapImagesDirectory))
            {
                Directory.CreateDirectory(mapImagesDirectory);
            }
            var imageFileName = $"{Guid.NewGuid()}{Path.GetExtension(image.FileName)}";
            var imagePath = Path.Combine(mapImagesDirectory, imageFileName);

            using (var stream = new FileStream(imagePath, FileMode.Create))
            {
                await image.CopyToAsync(stream);
            }
            return Path.Combine("Maps", imageFileName);
        }
    }
}
