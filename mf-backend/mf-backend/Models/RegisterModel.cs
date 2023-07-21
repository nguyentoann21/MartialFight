using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace mf_backend.Models
{
    public class RegisterModel
    {

        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }

        public IFormFile AvatarUrl { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; }
        public string Fullname { get; set; }

        [Required]
        public string Gender { get; set; }
    }
}
