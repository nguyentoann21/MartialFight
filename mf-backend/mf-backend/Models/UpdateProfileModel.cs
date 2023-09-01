using System.ComponentModel.DataAnnotations;

namespace mf_backend.Models
{
    public class UpdateProfileModel
    {
        public string? Email { get; set; }
        public string? Fullname { get; set; }
        public string? Gender { get; set; }
        public IFormFile? Avatar { get; set; }
    }

}
