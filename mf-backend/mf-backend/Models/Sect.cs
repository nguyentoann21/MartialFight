using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace mf_backend.Models
{
    public class Sect
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int SectId { get; set; }

        [Required]
        public string SectName { get; set; }

        [Required]
        public string  Description { get; set; }

        public string ImagePath { get; set; }

        public ICollection<Character> Characters { get; set; }
    }
}
