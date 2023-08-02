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
    [Route("api/mf/characters")]
    [ApiController]
    public class CharacterController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _environment;

        public CharacterController(ApplicationDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        // GET: api/mf/characters
        [HttpGet]
        public async Task<IActionResult> GetCharacters()
        {
            var characters = await _context.Characters.ToListAsync();
            return Ok(characters);
        }

        /*// GET: api/mf/characters/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCharacter(int id)
        {
            var character = await _context.Characters.FindAsync(id);
            if (character == null)
            {
                return NotFound("Character could not be found");
            }
            return Ok(character);
        }

        // POST: api/mf/characters
        [HttpPost]
        public async Task<IActionResult> CreateCharacter([FromForm] CharacterActionModel characterModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var character = new Character
            {
                CharacterName = characterModel.CharacterName,
                CharacterDescription = characterModel.CharacterDescription,
                AttackValue = characterModel.AttackValue,
                HealthValue = characterModel.HealthValue,
                DefenseValue = characterModel.DefenseValue,
                SpeedValue = characterModel.SpeedValue,
                IntellectValue = characterModel.IntellectValue,
                PhysicalValue = characterModel.PhysicalValue,
                SectID = characterModel.SectID
            };

            if (characterModel.Image != null)
            {
                var imageUrl = await SaveImage(characterModel.Image);
                character.Image = imageUrl;
            }

            _context.Characters.Add(character);
            await _context.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, character);
        }

        // PUT: api/mf/characters/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCharacter(int id, [FromForm] CharacterActionModel characterModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var character = await _context.Characters.FindAsync(id);
            if (character == null)
            {
                return NotFound();
            }

            character.CharacterName = characterModel.CharacterName;
            character.CharacterDescription = characterModel.CharacterDescription;
            character.AttackValue = characterModel.AttackValue;
            character.HealthValue = characterModel.HealthValue;
            character.DefenseValue = characterModel.DefenseValue;
            character.SpeedValue = characterModel.SpeedValue;
            character.IntellectValue = characterModel.IntellectValue;
            character.PhysicalValue = characterModel.PhysicalValue;
            character.SectID = characterModel.SectID;

            if (characterModel.Image != null)
            {
                var imageUrl = await SaveImage(characterModel.Image);
                character.Image = imageUrl;
            }

            _context.Entry(character).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return StatusCode(StatusCodes.Status202Accepted);
        }

        // DELETE: api/mf/characters/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCharacter(int id)
        {
            var character = await _context.Characters.FindAsync(id);
            if (character == null)
            {
                return NotFound();
            }

            _context.Characters.Remove(character);
            await _context.SaveChangesAsync();

            return Ok("Delete successful");
        }

        private async Task<string> SaveImage(IFormFile image)
        {
            var characterImagesDirectory = Path.Combine(_environment.WebRootPath, "Characters");

            if (!Directory.Exists(characterImagesDirectory))
            {
                Directory.CreateDirectory(characterImagesDirectory);
            }

            var imageFileName = $"{Guid.NewGuid()}{Path.GetExtension(image.FileName)}";
            var imagePath = Path.Combine(characterImagesDirectory, imageFileName);

            using (var stream = new FileStream(imagePath, FileMode.Create))
            {
                await image.CopyToAsync(stream);
            }

            return Path.Combine("Characters", imageFileName);
        }*/
    }
}
