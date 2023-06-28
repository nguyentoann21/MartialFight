using mf_backend.DataAccess;
using mf_backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace mf_backend.Controllers
{
    [Route("api/mf/")]
    [ApiController]
    public class AccountController : ControllerBase
    {

        private readonly ApplicationDbContext _context;

        public AccountController(ApplicationDbContext context)
        {
            _context = context;
        }


        [HttpGet("players")]
        public async Task<IActionResult> GetPlayers()
        {
            var players = await _context.Accounts.Where(x => x.Role == 0).ToListAsync();
            return StatusCode(StatusCodes.Status200OK, players);
        }
    }
}
