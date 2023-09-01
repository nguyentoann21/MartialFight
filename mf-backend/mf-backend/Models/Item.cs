using System.ComponentModel.DataAnnotations.Schema;

namespace mf_backend.Models
{
    public class Item
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ItemId { get; set; }

        public string ItemName { get; set; }

        public string Description { get; set; }

        public string ImagePath { get; set; }

        public int Silver { get; set; }

        public int Gold { get; set; }

        public int ManaValue { get; set; }

        public int HealthValue { get; set; }

        public int Type { get; set; }

        public bool Equipped { get; set; } = false;

        public int AttackValue { get; set; }

        public int DefenseValue { get; set; }

        public int SpeedValue { get; set; }

        public int IntellectValue { get; set; }

        public int PhysicalValue { get; set; }

        [ForeignKey(nameof(Sect))]
        public int SectId { get; set; }

        public Sect? Sect { get; set; }

        [ForeignKey(nameof(CategoryItem))]
        public int CategoryId { get; set; }

        public CategoryItem? Category { get; set; }
    }
}
