using System.ComponentModel.DataAnnotations;

namespace mf_backend.Models
{
    public class MapActionModel
    {
        public string MapName { get; set; }

        public int Level { get; set; }

        public string LevelRequirement { get; set; }

        public string Description { get; set; }

        public IFormFile? ImagePath { get; set; }

        public int Type { get; set; }
        public int Exp { get; set; }
        public int Silver { get; set; }
        public int ItemId { get; set; }
        public int AmountItem { get; set; }
    }
}
