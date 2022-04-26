
namespace SET3_Backend.Models
{

    public class BillGetData
    {
        public int UserOrderId { get; set; }
        public int CurrentUserId { get; set; }

        public int CashRegisterId { get; set; }

        public int ShopId { get; set; }

        public BillGetData(int userOrderId, int currentUserId, int cashRegisterId, int shopId)
        {
            UserOrderId = userOrderId;
            CurrentUserId = currentUserId;
            CashRegisterId = cashRegisterId;
            ShopId = shopId;
        }
    }
    public class BillInfo
    {
        public string Number { get; set; }
        public String Date { get; set; }
        public String StoreName { get; set; }

        public String StoreAdress { get; set; }

        public String CashRegister { get; set; }

        public BillInfo(string number, string date, string storeName, string storeAdress, string cashRegister)
        {
            Number = number;
            Date = date;
            StoreName = storeName;
            StoreAdress = storeAdress;
            CashRegister = cashRegister;
        }
    }

    public class BillItem
    {
        public string Name { get; set; }
        public double Quantity { get; set; }
        public string Measurment { get; set; }
        public double Vat { get; set; }
        public double UnitPrice { get; set; }

        public BillItem(string name, double quantity, string measurment, double vat, double unitPrice)
        {
            Name = name;
            Quantity = quantity;
            Measurment = measurment;
            Vat = vat;
            UnitPrice = unitPrice;
        }
    }

    public class BillSupplier
    {
        public String FirstName { get; set; }
        public String LastName { get; set; }
        public String Email { get; set; }

        public BillSupplier(string firstName, string lastName, string email)
        {
            this.FirstName = firstName;
            this.LastName = lastName;
            this.Email = email;
        }
    }
    public class BillModel
    {        
        public BillInfo BillInfo { get; set; }
        public List<BillItem> BillItems { get; set; }

        public BillSupplier BillSupplier { get; set; }

        public BillModel(BillInfo billInfo, List<BillItem> billItems, BillSupplier billSupplier)
        {
            BillInfo = billInfo;
            BillItems = billItems;
            BillSupplier = billSupplier;
        }
    }
}
