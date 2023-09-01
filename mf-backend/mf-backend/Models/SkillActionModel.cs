using System.ComponentModel.DataAnnotations;

namespace mf_backend.Models
{
    public class SkillActionModel
    {
        public string SkillName { get; set; }

        public string BriefDescription { get; set; }
        public string DetailDescription { get; set; }

        public bool Type { get; set; }

        public IFormFile? ImagePath { get; set; }

        public int Cooldown { get; set; }
    }
}
