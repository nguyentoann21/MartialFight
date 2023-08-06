using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace mf_backend.Models
{
    public class Account
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int AccountID { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }

        public string AvatarUrl { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; }
        public string Fullname { get; set; }

        [Required]
        public string Gender { get; set; }

        [Required]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public DateTime Created_at { get; set; } = DateTime.Now;

        public bool Active { get; set; } = true;
        public int Role { get; set; } = 0;

        public bool RememberMe { get; set; }

        public string ResetCode { get; set; } = string.Empty;
    }   
}
