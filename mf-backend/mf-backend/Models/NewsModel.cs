namespace mf_backend.Models
{
    public class NewsModel
    {
        public int NewsID { get; set; }
        public string NewsTitle { get; set; }
        public string NewsContent { get; set; }
        public List<string> Images { get; set; }
        public DateTime PostAt { get; set; }
    }
}
