using System.ComponentModel.DataAnnotations;

namespace SET3_Backend.Models
{
    public class ShopModel
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Adress { get; set; }

        public int StockId { get; set; }
        public bool Deleted { get; set; }

        // new atribute for receipt
        public string ReceiptType { get; set; }

        public ShopModel(string name, string adress, int stockId, bool deleted, string receiptType)
        {
            Name = name;
            Adress = adress;
            StockId = stockId;
            Deleted = deleted;
            ReceiptType = receiptType;
        }

        public ShopModel(int id, string name, string adress, int stockId, bool deleted, string receiptType): this(name, adress, stockId, deleted, receiptType)
        {
            Id = id;
        }
    }
}
