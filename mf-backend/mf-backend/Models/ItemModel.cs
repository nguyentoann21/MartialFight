using System.ComponentModel.DataAnnotations.Schema;

namespace mf_backend.Models
{
    public class ItemModel
    {
        public int ItemID { get; set; }

        public string ItemName { get; set; }

        public string ItemDescription { get; set; }

        public string Image { get; set; }

        public int Gold { get; set; }

        public int Diamond { get; set; }

        public int ItemType { get; set; }

        public bool Equipped { get; set; }

        public int AttackValue { get; set; }

        public int HealthValue { get; set; }

        public int DefenseValue { get; set; }

        public int SpeedValue { get; set; }

        public int IntellectValue { get; set; }

        public int PhysicalValue { get; set; }

        [ForeignKey(nameof(Sect))]
        public int SectID { get; set; }

        public Sect? ItemSect { get; set; }

        [ForeignKey(nameof(CategoryItem))]
        public int CategoryID { get; set; }

        public CategoryItem? ItemCategory { get; set; }
    }
}
