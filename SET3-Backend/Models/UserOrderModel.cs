using System.ComponentModel.DataAnnotations;

namespace SET3_Backend.Models
{
    public class UserOrderModel
    {
        [Key]
        public int Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool Done { get; set; }
        public int ShopId { get; set; }
        public int UserId { get; set; }

        public UserOrderModel()
        {
        }

        public UserOrderModel(int id, DateTime createdDate, bool done, int shopId, int userId)
        {
            Id = id;
            CreatedDate = createdDate;
            Done = done;
            ShopId = shopId;
            UserId = userId;
        }
    }
}
