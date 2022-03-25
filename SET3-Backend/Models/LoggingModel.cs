using System.ComponentModel.DataAnnotations;

namespace SET3_Backend.Models
{
    public class LoggingModel
    {
        [Key]
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public UserModel UserModel { get; set; }
        public int UserId { get; set; }
        public ActionModel Action { get; set; }
        public int ActionId { get; set; }
    }
}
