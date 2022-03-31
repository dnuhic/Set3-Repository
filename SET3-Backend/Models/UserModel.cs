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
		public RoleModel Role { get; set; }
		public int RoleId { get; set; }
		public int QuestionId { get; set; }
		public string Answer { get; set; }
		public bool Deleted { get; set; }
        public bool TFA { get; set; }

        public UserModel() { }

        public UserModel(string email, string firstName, string lastName, string password, 
            RoleModel role, int roleId, int questionId, string answer, bool deleted)
        {
            Email = email;
            FirstName = firstName;
            LastName = lastName;
            Password = password;
            Role = role;
            RoleId = roleId;
            QuestionId = questionId;
            Answer = answer;
            Deleted = deleted;
            TFA = false;
        }
    }
}
