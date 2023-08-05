using mf_backend.DataAccess;
using mf_backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace mf_backend.Controllers
{
    [Route("api/mf/rank/")]
    [ApiController]
    public class RankController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IHubContext<RankingHub> _hub;

        public RankController(ApplicationDbContext context, IHubContext<RankingHub> hub)
        {
            _context = context;
            _hub = hub;
        }

        [HttpGet("top-15-level")]
        public IActionResult RankByLevel()
        {
            var level = _context.PlayerAttributes
                        .OrderByDescending(p => p.Level)
                        .ThenByDescending(p => p.ScorePvP)
                        .ThenByDescending(p => p.NumberOfMaps)
                        .Take(15)
                        .ToList();
            return Ok(level);
        }

        [HttpGet("top-15-score")]
        public IActionResult RankByScore()
        {
            var score = _context.PlayerAttributes
                        .OrderByDescending(p => p.ScorePvP)
                        .ThenByDescending(p => p.NumberOfMaps)
                        .ThenByDescending(p => p.Level)
                        .Take(15)
                        .ToList();
            return Ok(score);
        }

        [HttpGet("top-15-challenge")]
        public IActionResult RankByChallenge()
        {
            var challenge = _context.PlayerAttributes
                        .OrderByDescending(p => p.NumberOfMaps)
                        .ThenByDescending(p => p.Level)
                        .ThenByDescending(p => p.ScorePvP)
                        .Take(15)
                        .ToList();
            return Ok(challenge);
        }
    }
}
