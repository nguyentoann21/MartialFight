using System.ComponentModel.DataAnnotations.Schema;

namespace mf_backend.Models
{
    public class ItemActionModel
    {
        public string ItemName { get; set; }

        public string Description { get; set; }

        public IFormFile? ImagePath { get; set; }

        public int Gold { get; set; }

        public int Silver { get; set; }
        public int ManaValue { get; set; }

        public int Type { get; set; }

        public bool Equipped { get; set; } = false;

        public int AttackValue { get; set; }

        public int HealthValue { get; set; }

        public int DefenseValue { get; set; }

        public int SpeedValue { get; set; }

        public int IntellectValue { get; set; }

        public int PhysicalValue { get; set; }

        public int SectId { get; set; }

        public int CategoryId { get; set; }
    }
}
