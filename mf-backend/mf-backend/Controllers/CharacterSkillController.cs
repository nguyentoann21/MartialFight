using mf_backend.DataAccess;
using mf_backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace mf_backend.Controllers
{
    [Route("api/mf/character-skill")]
    [ApiController]
    public class CharacterSkillController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CharacterSkillController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/mf/character-skill/{id}/skills
        [HttpGet("{id}/skills")]
        public async Task<ActionResult<IEnumerable<Skill>>> GetSkillsForCharacter(int id)
        {
            var skillIds = await _context.CharacterSkills
                .Where(cs => cs.CharacterID == id)
                .Select(cs => cs.SkillID)
                .ToListAsync();

            var skills = await _context.Skills
                .Where(skill => skillIds.Contains(skill.SkillID))
                .ToListAsync();

            if (skills == null)
            {
                return NotFound();
            }

            return skills;
        }
    }
}
