using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace mf_backend.Models
{
    public class Skill
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int SkillID { get; set; }

        [Required]
        public string SkillName { get; set; }

        public string SkillDescription { get; set; }

        public string SkillType { get; set; }

        public int HealthValue { get; set; }

        public int ManaValue { get; set; }

        public int AttackValue { get; set; }

        public int DefenseValue { get; set; }

        public int SpeedValue { get; set; }

        public int IntellectValue { get; set; }

        public int PhysicalValue { get; set; }

        public string Images { get; set; }
    }
}
