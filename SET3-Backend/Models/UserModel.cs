using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SET3_Backend.Models
{
    public class UserModel
    {
		[Key]
		public int Id { get; set; }
		[EmailAddress]
		public string Email { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string Password { get; set; }
		public SecurityQuestionModel Question { get; set; }
		public int QuestionId { get; set; }
		public string Answer { get; set; }
		public bool Deleted { get; set; }
	}
}
