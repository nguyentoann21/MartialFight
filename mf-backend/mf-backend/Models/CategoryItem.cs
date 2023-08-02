using System.ComponentModel.DataAnnotations.Schema;

namespace mf_backend.Models
{
    public class CategoryItem
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CategoryID { get; set; }

        public string CategoryName { get; set; }

        public string CategoryDescription { get; set; }

        public string Image { get; set; }
    }
}
