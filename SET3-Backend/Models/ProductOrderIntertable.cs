using System.ComponentModel.DataAnnotations;

namespace SET3_Backend.Models
{
    public class ProductOrderIntertable
    {
        [Key]
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int OrderId { get; set; }
        public int Quantity { get; set; }
    }
}
