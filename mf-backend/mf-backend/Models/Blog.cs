using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace mf_backend.Models
{
    public class Blog
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int BlogID { get; set; }

        [Required]
        public string BlogTitle { get; set; }

        [Required]
        public string BlogContent { get; set; }

        public string Images { get; set; } 

        [Required]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public DateTime PostAt { get; set; } = DateTime.Now;
    }
}
