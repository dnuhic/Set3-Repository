using System.ComponentModel.DataAnnotations;

namespace SET3_Backend.Models
{
    public class ProductShopIntertable
    {
        [Key]
        public int Id { get; set; }
        public int ShopId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
