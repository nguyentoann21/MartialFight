using System.ComponentModel.DataAnnotations;

namespace mf_backend.Models
{
    public class MapModel
    {
        public int MapID { get; set; }

        [Required]
        public string MapName { get; set; }

        public int Level { get; set; }

        public string LevelRequirement { get; set; }

        public string MapDescription { get; set; }

        public string Image { get; set; }
    }
}
