using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace mf_backend.Models
{
    public class CharacterModel
    {
        public int CharacterID { get; set; }

        [Required]
        public string CharacterName { get; set; }

        public string CharacterDescription { get; set; }

        public string Image { get; set; }

        public int AttackValue { get; set; }

        public int HealthValue { get; set; }

        public int DefenseValue { get; set; }

        public int SpeedValue { get; set; }

        public int IntellectValue { get; set; }

        public int PhysicalValue { get; set; }

        [ForeignKey(nameof(Sect))]
        public int SectID { get; set; }

        public Sect CharacterSect { get; set; }
    }
}
