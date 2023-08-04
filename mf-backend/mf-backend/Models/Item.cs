using System.ComponentModel.DataAnnotations.Schema;

namespace mf_backend.Models
{
    public class Item
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ItemID { get; set; }

        public string ItemName { get; set; }

        public string ItemDescription { get; set; }

        public string Image { get; set; }

        public int Gold { get; set; }

        public int Diamond { get; set; }

        public int ItemType { get; set; }

        public bool Equipped { get; set; } = false;

        [ForeignKey(nameof(Sect))]
        public int SectID { get; set; }

        public Sect? ItemSect { get; set; }

        [ForeignKey(nameof(CategoryItem))]
        public int CategoryID { get; set; }

        public CategoryItem? ItemCategory { get; set; }
    }
}
