using System.ComponentModel.DataAnnotations;

namespace SET3_Backend.Models
{
    public class StockModel
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; } 
    }
}
