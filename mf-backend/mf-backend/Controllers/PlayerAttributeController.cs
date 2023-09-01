using mf_backend.DataAccess;
using mf_backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace mf_backend.Controllers
{
    [Route("api/mf/player-attribute")]
    [ApiController]
    public class PlayerAttributeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PlayerAttributeController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public ActionResult<IEnumerable<PlayerAttribute>> GetPlayerAttributesByAccount(int id)
        {
            var playerAttributes = _context.PlayerAttributes
                .Where(pa => pa.AccountId == id)
                .ToList();

            return Ok(playerAttributes);
        }
    }
}
