using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace mf_backend.Models
{
    public class Map
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int MapID { get; set; }

        public string MapName { get; set; }

        public int Level { get; set; }

        public string LevelRequirement { get; set; }

        public string MapDescription { get; set; }

        public string Image { get; set; }
    }
}
