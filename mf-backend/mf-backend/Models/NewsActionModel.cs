using System.ComponentModel.DataAnnotations;

namespace mf_backend.Models
{
    public class NewsActionModel
    {
        public string? NewsTitle { get; set; }

        public string? NewsContent { get; set; }

        public List<IFormFile>? Images { get; set; }
    }
}
