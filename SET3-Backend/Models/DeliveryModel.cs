using System.ComponentModel.DataAnnotations;

namespace SET3_Backend.Models
{
    public class DeliveryModel
    {
        [Key]
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int Quantity { get; set; }
        public int ProductId { get; set; }
    }
}
