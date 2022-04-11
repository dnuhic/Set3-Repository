using System.ComponentModel.DataAnnotations;

namespace SET3_Backend.Models
{
    public class OrderModel
    {

        [Key]
        public int Id { get; set; }
        public int ShopId { get; set; }
        public DateTime Date { get; set; }
        public int Quantity { get; set; }
        public int ProductId { get; set; }

        public OrderModel(int shopId, DateTime date, int quantity, int productId)
        {
            ShopId = shopId;
            Date = date;
            Quantity = quantity;
            ProductId = productId;
        }
    }
}
