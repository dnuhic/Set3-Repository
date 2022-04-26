using System.ComponentModel.DataAnnotations;

namespace SET3_Backend.Models
{
    public class ProductUserOrderIntertable
    {
        [Key]
        public int Id { get; set; }
        public int UserOrderId { get; set; }
        public int ProductId { get; set; }
        public double Quantity { get; set; }

        public ProductUserOrderIntertable()
        {
        }

        public ProductUserOrderIntertable(int userOrderId, int productId, double quantity)
        {
            UserOrderId = userOrderId;
            ProductId = productId;
            Quantity = quantity;
        }
    }
}
