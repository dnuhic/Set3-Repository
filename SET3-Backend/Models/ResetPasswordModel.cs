using Newtonsoft.Json.Linq;

namespace SET3_Backend.Models
{
    public class ResetPasswordModel
    {
        public string Password { get; set; }
        public string id { get; set; }

        public static implicit operator ResetPasswordModel(JObject v)
        {
            throw new NotImplementedException();
        }
    }
}
