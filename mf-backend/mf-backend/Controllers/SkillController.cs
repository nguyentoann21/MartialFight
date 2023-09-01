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
    [Route("api/mf/skills")]
    [ApiController]
    public class SkillController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _environment;

        public SkillController(ApplicationDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        // GET: api/mf/skills
        [HttpGet]
        public async Task<IActionResult> GetSkills()
        {
            var skills = await _context.Skills.ToListAsync();
            return Ok(skills);
        }

        // GET: api/mf/skills/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSkill(int id)
        {
            var skill = await _context.Skills.FindAsync(id);
            if (skill == null)
            {
                return NotFound("Skill could not be found");
            }
            return Ok(skill);
        }

        // POST: api/mf/skills
        [HttpPost]
        public async Task<IActionResult> CreateSkill([FromForm] SkillActionModel skillModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var skill = new Skill
            {
                SkillName = skillModel.SkillName,
                BriefDescription = skillModel.BriefDescription,
                DetailDescription = skillModel.DetailDescription,
                Type = skillModel.Type,
                Cooldown = skillModel.Cooldown

            };

            if (skillModel.ImagePath != null)
            {
                var imageUrl = await SaveImage(skillModel.ImagePath);
                if (imageUrl.Equals(string.Empty))
                {
                    return StatusCode(StatusCodes.Status405MethodNotAllowed, "Invalid image format.Valid format (png, jpg, gif or jpeg)");
                }
                skill.ImagePath = imageUrl;
            }

            _context.Skills.Add(skill);
            await _context.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, skill);
        }

        // PUT: api/mf/skills/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSkill(int id, [FromForm] SkillActionModel skillModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var skill = await _context.Skills.FindAsync(id);
            if (skill == null)
            {
                return NotFound();
            }

            skill.SkillName = skillModel.SkillName;
            skill.BriefDescription = skillModel.BriefDescription;
            skill.DetailDescription = skillModel.DetailDescription;
            skill.Type = skillModel.Type;
            skill.Cooldown = skillModel.Cooldown;

            if (skillModel.ImagePath != null)
            {
                var imageUrl = await SaveImage(skillModel.ImagePath);
                if (imageUrl.Equals(string.Empty))
                {
                    return StatusCode(StatusCodes.Status405MethodNotAllowed, "Invalid image format.Valid format (png, jpg, gif or jpeg)");
                }
                skill.ImagePath = imageUrl;
            }

            _context.Entry(skill).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return StatusCode(StatusCodes.Status202Accepted);
        }



        // DELETE: api/mf/skills/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSkill(int id)
        {
            var skill = await _context.Skills.FindAsync(id);
            if (skill == null)
            {
                return NotFound();
            }

            bool isReferenced = await _context.CharacterSkills.AnyAsync(i => i.SkillId == id);

            if (isReferenced)
            {
                return StatusCode(StatusCodes.Status409Conflict, "Cannot delete the skill because it is referenced by character");
            }

            _context.Skills.Remove(skill);
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
