using System.ComponentModel.DataAnnotations;

namespace SET3_Backend.Models
{
    public class SecurityQuestionModel
    {
        [Key]
        public int Id { get; set; }
        public string Question { get; set; }
        
        public SecurityQuestionModel() { }

        public SecurityQuestionModel(string question)
        {
            Question = question;
        }

        public SecurityQuestionModel(int id, string question) : this(question)
        {
            Id = id;
        }
    }
}
