namespace mf_backend.Models
{
    public class VerifyCode
    {
        public int VerifyCodeID { get; set; }

        public string Email { get; set; }

        public string Code { get; set; }

        public DateTime Ex_Time { get; set; }
    }
}
