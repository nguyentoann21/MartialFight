using System.ComponentModel.DataAnnotations.Schema;

namespace mf_backend.Models
{
    public class CharacterSkill
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CharacterSkillId { get; set; }

        public int CharacterId { get; set; }

        public int SkillId { get; set; }

        public Skill? Skill { get; set; }
        public Character? Character { get; set; }
    }
}
