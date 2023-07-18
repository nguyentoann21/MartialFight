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

        [HttpPut("{id}/active")]
        public async Task<IActionResult> UpdateActive(int id, [FromBody] bool isActive)
        {
            var account = await _context.Accounts.FindAsync(id);
            if (account == null)
            {
                return StatusCode(StatusCodes.Status404NotFound, "Account does not exist");
            }

            if (account.Active == isActive)
            {
                return StatusCode(StatusCodes.Status403Forbidden, "The status does not change");
            }

            account.Active = isActive;
            _context.Entry(account).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "Status updated successfully");
        }
    }
}
