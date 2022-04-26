using System.ComponentModel.DataAnnotations;

namespace SET3_Backend.Models
{
    public class UserOrderModel
    {
        [Key]
        public int Id { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool Done { get; set; }
        public int ShopId { get; set; }
        public int UserId { get; set; }
        public int CashRegisterId { get; set; }

        public UserOrderModel()
        {
        }

        public UserOrderModel(DateTime updatedDate, bool done, int shopId, int userId, int cashRegisterId)
        {
            UpdatedDate = updatedDate;
            Done = done;
            ShopId = shopId;
            UserId = userId;
            CashRegisterId = cashRegisterId;
        }
    }
}
