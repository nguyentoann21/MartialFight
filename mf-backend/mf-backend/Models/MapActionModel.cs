using System.ComponentModel.DataAnnotations;

namespace mf_backend.Models
{
    public class MapActionModel
    {
        public string MapName { get; set; }

        public int Level { get; set; }

        public string LevelRequirement { get; set; }

        public string MapDescription { get; set; }

        public IFormFile? Image { get; set; }
    }
}
