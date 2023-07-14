using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using mf_backend.Models;
using mf_backend.DataAccess;

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
        public IActionResult GetCharacters()
        {
            var characters = _context.Characters.Include(c => c.CharacterSect).ToList();
            return Ok(characters);
        }

        // GET: api/mf/characters/{id}
        [HttpGet("{id}")]
        public IActionResult GetCharacter(int id)
        {
            var character = _context.Characters.Include(c => c.CharacterSect).FirstOrDefault(c => c.CharacterID == id);
            if (character == null)
                return NotFound();
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

            if (characterModel.Images != null && characterModel.Images.Count > 0)
            {
                var imageUrls = await SaveImages(characterModel.Images);
                character.Images = string.Join(",", imageUrls);
            }

            _context.Characters.Add(character);
            await _context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, character);
        }

        // PUT: api/mf/characters/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCharacter(int id, [FromForm] CharacterActionModel characterModel)
        {
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

            if (characterModel.Images != null && characterModel.Images.Count > 0)
            {
                var imageUrls = await SaveImages(characterModel.Images);
                character.Images = string.Join(",", imageUrls);
            }

            _context.Entry(character).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK);
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

        private async Task<string[]> SaveImages(List<IFormFile> images)
        {
            var imageUrls = new string[images.Count];
            var mapImagesDirectory = Path.Combine(_environment.WebRootPath, "Characters");

            if (!Directory.Exists(mapImagesDirectory))
            {
                Directory.CreateDirectory(mapImagesDirectory);
            }

            for (var i = 0; i < images.Count; i++)
            {
                var imageFile = images[i];
                var imageFileName = $"{Guid.NewGuid()}{Path.GetExtension(imageFile.FileName)}";
                var imagePath = Path.Combine(mapImagesDirectory, imageFileName);

                using (var stream = new FileStream(imagePath, FileMode.Create))
                {
                    await imageFile.CopyToAsync(stream);
                }

                imageUrls[i] = Path.Combine("Characters", imageFileName);
            }

            return imageUrls;
        }
    }
}
