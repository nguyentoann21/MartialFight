using mf_backend.DataAccess;
using mf_backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace mf_backend.Controllers
{
    [Route("api/mf/")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public LoginController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginModel request, bool rememberMe = false)
        {
            var account = await _context.Accounts.FirstOrDefaultAsync(x =>
                x.Username == request.UsernameOrEmail || x.Email == request.UsernameOrEmail);

            if (account == null)
            {
                return NotFound("Account does not existed");
            }

            if (!account.Active)
            {
                return StatusCode(StatusCodes.Status403Forbidden, "Your account is banned");
            }

            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(request.Password, account.Password);

            if (!isPasswordValid)
            {
                return Unauthorized();
            }

            string role = account.Role == 1 ? "admin" : "player";
            account.RememberMe = rememberMe;

            return StatusCode(StatusCodes.Status200OK, account);
        }
    }
}
