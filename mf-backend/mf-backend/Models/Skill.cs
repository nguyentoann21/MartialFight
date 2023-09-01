using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace mf_backend.Models
{
    public class Skill
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int SkillId { get; set; }

        [Required]
        public string SkillName { get; set; }

        public string BriefDescription { get; set; } //brief and detail
        public string DetailDescription { get; set; } //brief and detail

        public bool Type { get; set; } // int

        public string ImagePath { get; set; }

        public int Cooldown { get; set; }
    }
}
