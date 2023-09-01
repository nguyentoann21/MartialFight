using System.ComponentModel.DataAnnotations;

namespace mf_backend.Models
{
    public class NewsActionModel
    {
        public string? NewsTitle { get; set; }

        public string? Description { get; set; }

        public List<IFormFile>? ImagePath { get; set; }
    }
}
