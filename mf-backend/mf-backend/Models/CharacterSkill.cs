using System.ComponentModel.DataAnnotations.Schema;

namespace mf_backend.Models
{
    public class CharacterSkill
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CharacterSkillId { get; set; }

        public int CharacterID { get; set; }

        public int SkillID { get; set; }
    }
}
