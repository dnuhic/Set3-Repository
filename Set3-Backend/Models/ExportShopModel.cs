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

        public ExportShopModel(int shopId, int productId, double quantity, DateTime dateTime, string status, int register, int table)
        {
            ShopId = shopId;
            ProductId = productId;
            Quantity = quantity;
            DateTime = dateTime;
            Status = status;
            CashRegisterId = register;
            TableId = table;
        }
    }

    public class ExportShopToPdfModel
    {
        public int ShopId { get; set; }

        public ShopModel Shop { get; set; }

        public int ProductId { get; set; }

        public ProductModel Product { get; set; }

        public double Quantity { get; set; }

        public DateTime DateTime { get; set; }

        public string Status { get; set; }

        public int? CashRegisterId { get; set; }

        public CashRegisterModel? Register { get; set; }

        public int? TableId { get; set; }

        public TableModel? Table { get; set; }
    }
}
