using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace mf_backend.Models
{
    public class Sect
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int SectID { get; set; }

        [Required]
        public string SectName { get; set; }

        [Required]
        public string  SectDescription { get; set; }

        public string Image { get; set; }

        [ForeignKey(nameof(Character))]
        public int CharacterID { get; set; }

        public ICollection<Character> SectCharacters { get; set; }
    }
}
