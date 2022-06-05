using System.ComponentModel.DataAnnotations;

namespace SET3_Backend.Models
{
    public class ProductModel
    {
        [Key]
        public int Id { get; set; }

        public int StockId  { get; set; }
        public string Name { get; set; }
        public string CategoryName { get; set; }
        public bool Deleted { get; set; }
        public double Quantity { get; set; }

        public string  Barcode  { get; set; }

        public string  BarcodeText  { get; set; }
        public float Price { get; set; }
        
        public string MeasuringUnit { get; set; }

        public ProductModel(int stockId, string name, string categoryName, bool deleted, double quantity, string barcode, string barcodeText, float price, string measuringUnit)
        {
            StockId = stockId;
            Name = name;
            CategoryName = categoryName;
            Deleted = deleted;
            Quantity = quantity;
            Barcode = barcode;
            BarcodeText = barcodeText;
            Price = price;
            MeasuringUnit = measuringUnit;
        }

        public ProductModel(int id, int stockId, string name, string categoryName, bool deleted, double quantity, string barcode, string barcodeText, float price, string measuringUnit) : this(stockId, name, categoryName, deleted, quantity, barcode, barcodeText, price, measuringUnit){
            Id = id;
        }

    }


}
