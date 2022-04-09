using System.ComponentModel.DataAnnotations;

namespace SET3_Backend.Models
{
    public class ProductShopIntertable
    {
        [Key]
        public int Id { get; set; }
        public int StockId { get; set; }
        public int SroductId { get; set; }
        public int Quantity { get; set; }
    }
}
