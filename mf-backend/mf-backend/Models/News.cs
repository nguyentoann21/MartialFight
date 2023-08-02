using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace mf_backend.Models
{
    public class News
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int NewsID { get; set; }

        public string NewsTitle { get; set; }

        public string NewsContent { get; set; }

        public string Images { get; set; } 

        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public DateTime PostAt { get; set; } = DateTime.Now;
    }
}
