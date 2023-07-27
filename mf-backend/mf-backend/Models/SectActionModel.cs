using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace mf_backend.Models
{
    public class SectActionModel
    {
        public string SectName { get; set; }

        public string SectDescription { get; set; }

        public IFormFile? Image { get; set; }
    }
}
