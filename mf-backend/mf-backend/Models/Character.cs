using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace mf_backend.Models
{
    public class Character
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CharacterId { get; set; }

        [Required]
        public string CharacterName { get; set; }

        public string Description { get; set; }

        public string ImagePath { get; set; }

        public int AttackValue { get; set; }

        public int DefenseValue { get; set; }

        public int SpeedValue { get; set; }

        public int IntellectValue { get; set; }

        public int PhysicalValue { get; set; }

        public Gender? Gender { get; set; }

        [ForeignKey(nameof(Sect))]
        public int SectId { get; set; }

        public Sect? Sect { get; set; }

    }

    public enum Gender
    {
        Female,
        Male
    }
}
