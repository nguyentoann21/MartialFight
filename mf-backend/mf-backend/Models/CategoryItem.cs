using System.ComponentModel.DataAnnotations.Schema;

namespace mf_backend.Models
{
    public class CategoryItem
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CategoryId { get; set; }

        public string CategoryName { get; set; }

        public string Description { get; set; }

        public string ImagePath { get; set; }
    }
}
