using Newtonsoft.Json.Linq;

namespace SET3_Backend.Models
{
    public class MailRequest
    {
        public string ToEmail { get; set; }

        public static implicit operator MailRequest(JObject v)
        {
            throw new NotImplementedException();
        }
    }
}
