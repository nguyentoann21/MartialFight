using System.ComponentModel.DataAnnotations;

namespace mf_backend.Models
{
    public class LoginModel
    {
        [Required]
        public string UsernameOrEmail { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
