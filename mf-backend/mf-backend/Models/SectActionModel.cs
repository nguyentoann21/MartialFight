using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace mf_backend.Models
{
    public class SectActionModel
    {
        [Required]
        public string SectName { get; set; }

        [Required]
        public string SectDescription { get; set; }

        public List<IFormFile> Images { get; set; }
    }
}
