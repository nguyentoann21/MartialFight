using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace mf_backend.Models
{
    public class Map
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int MapId { get; set; }

        public string MapName { get; set; }

        public int Level { get; set; }

        public int TranformX { get; set; } = 0;
        public int TranformY { get; set; } = 0;

        public string LevelRequirement { get; set; }

        public string Description { get; set; }

        public string ImagePath { get; set; }

        public int Type { get; set; }
        public int Exp { get; set; }
        public int Silver { get; set; }
        public int AmountItem { get; set; }

        [ForeignKey(nameof(Item))]
        public int ItemId { get; set; }

        public Item? Item { get; set; }
    }
}
