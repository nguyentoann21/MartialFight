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
        public async Task<IActionResult> Getskills()
        {
            var skills = await _context.Skills.ToListAsync();
            return Ok(skills);
        }

        // GET: api/mf/skills/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> Getskill(int id)
        {
            var skill = await _context.Skills.FindAsync(id);
            if (skill == null)
            {
                return NotFound("skill could not be found");
            }
            return Ok(skill);
        }

        // POST: api/mf/skills
        [HttpPost]
        public async Task<IActionResult> Createskill([FromForm] SkillActionModel skillModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var skill = new Skill
            {
                SkillName = skillModel.SkillName,
                SkillDescription = skillModel.SkillDescription,
                SkillType = skillModel.SkillType,
                HealthValue = skillModel.HealthValue,
                ManaValue = skillModel.ManaValue,
                AttackValue = skillModel.AttackValue,
                DefenseValue = skillModel.DefenseValue,
                SpeedValue = skillModel.SpeedValue,
                IntellectValue = skillModel.IntellectValue,
                PhysicalValue = skillModel.PhysicalValue
        };

            if (skillModel.Images != null && skillModel.Images.Count > 0)
            {
                var imageUrls = await SaveImages(skillModel.Images);
                skill.Images = string.Join(",", imageUrls);
            }

            _context.Skills.Add(skill);
            await _context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, skill);
        }

        // PUT: api/mf/skills/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Updateskill(int id, [FromForm] SkillActionModel skillModel)
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
            skill.SkillDescription = skillModel.SkillDescription;
            skill.SkillType = skillModel.SkillType;
            skill.HealthValue = skillModel.HealthValue;
            skill.ManaValue = skillModel.ManaValue;
            skill.AttackValue = skillModel.AttackValue;
            skill.DefenseValue = skillModel.DefenseValue;
            skill.SpeedValue = skillModel.SpeedValue;
            skill.IntellectValue = skillModel.IntellectValue;
            skill.PhysicalValue = skillModel.PhysicalValue;

            if (skillModel.Images != null && skillModel.Images.Count > 0)
            {
                var imageUrls = await SaveImages(skillModel.Images);
                skill.Images = string.Join(",", imageUrls);
            }

            _context.Entry(skill).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK);
        }

        // DELETE: api/mf/skills/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Deleteskill(int id)
        {
            var skill = await _context.Skills.FindAsync(id);
            if (skill == null)
            {
                return NotFound();
            }

            _context.Skills.Remove(skill);
            await _context.SaveChangesAsync();

            return Ok("Delete successful");
        }

        private async Task<string[]> SaveImages(List<IFormFile> images)
        {
            var imageUrls = new string[images.Count];
            var skillImagesDirectory = Path.Combine(_environment.WebRootPath, "Skills");

            if (!Directory.Exists(skillImagesDirectory))
            {
                Directory.CreateDirectory(skillImagesDirectory);
            }

            for (var i = 0; i < images.Count; i++)
            {
                var imageFile = images[i];
                var imageFileName = $"{Guid.NewGuid()}{Path.GetExtension(imageFile.FileName)}";
                var imagePath = Path.Combine(skillImagesDirectory, imageFileName);

                using (var stream = new FileStream(imagePath, FileMode.Create))
                {
                    await imageFile.CopyToAsync(stream);
                }

                imageUrls[i] = Path.Combine("Skills", imageFileName);
            }

            return imageUrls;
        }
    }
}
