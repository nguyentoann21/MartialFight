namespace mf_backend.Models
{
    public class SectModel
    {
        public int SectID { get; set; }

        public string SectName { get; set; }

        public string SectDescription { get; set; }

        public List<string> Images { get; set; }
    }
}
