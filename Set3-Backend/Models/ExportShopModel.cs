using System.ComponentModel.DataAnnotations;

namespace SET3_Backend.Models
{

    public enum ExportStatus
    {
        INPORT,
        EXPORT
    }
    public class ExportShopModel
    {
        [Key]
        public int Id { get; set; }

        public int ShopId { get; set; }

        public int ProductId { get; set; }

        public double Quantity { get; set; }

        public DateTime DateTime { get; set; }

        public string Status { get; set; }

        public int CashRegisterId { get; set; }

        public int TableId { get; set; }

        public ExportShopModel(int shopId, int productId, double quantity, DateTime dateTime, string status, int cashRegisterId, int tableId)
        {
            ShopId = shopId;
            ProductId = productId;
            Quantity = quantity;
            DateTime = dateTime;
            Status = status;
            CashRegisterId = cashRegisterId;
            TableId = tableId;
        }
    }

    public class ExportShopToPdfModel
    {
        public int ShopId { get; set; }

        public string ShopName { get; set; }
        public  string ShopAdress { get; set; }

        public int ProductId { get; set; }

        public string ProductName { get; set; }
        public string ProductCategory { get; set; }
        public float ProductPrice { get; set; }

        public double Quantity { get; set; }

        public DateTime DateTime { get; set; }

        public string Status { get; set; }

        public int? CashRegisterId { get; set; }
        public string? CashRegisterName { get; set; }


        public int? TableId { get; set; }

        public string? TableName { get; set; }
    }
}
