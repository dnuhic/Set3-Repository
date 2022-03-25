using System.ComponentModel.DataAnnotations;

namespace SET3_Backend.Models
{
    public class SecurityQuestionModel
    {
        [Key]
        public int Id { get; set; }
        public string Question { get; set; }
        
    }
}
