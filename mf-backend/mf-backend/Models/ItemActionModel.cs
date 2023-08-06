using System.ComponentModel.DataAnnotations.Schema;

namespace mf_backend.Models
{
    public class ItemActionModel
    {
        public string ItemName { get; set; }

        public string ItemDescription { get; set; }

        public IFormFile? Image { get; set; }

        public int Gold { get; set; }

        public int Diamond { get; set; }

        public int ItemType { get; set; }

        public bool Equipped { get; set; } = false;

        public int AttackValue { get; set; }

        public int HealthValue { get; set; }

        public int DefenseValue { get; set; }

        public int SpeedValue { get; set; }

        public int IntellectValue { get; set; }

        public int PhysicalValue { get; set; }

        public int SectID { get; set; }

        public int CategoryID { get; set; }
    }
}
