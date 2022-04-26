using System.ComponentModel.DataAnnotations;

namespace SET3_Backend.Models
{
    public class ProductShopIntertable
    {
        [Key]
        public int Id { get; set; }
        public int ShopId { get; set; }
        public int ProductId { get; set; }
        public double Quantity { get; set; }

        public ProductShopIntertable(int shopId, int productId, double quantity)
        {
            ShopId = shopId;
            ProductId = productId;
            Quantity = quantity;
        }
    }
}
