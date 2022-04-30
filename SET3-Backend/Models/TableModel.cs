using System.ComponentModel.DataAnnotations;

namespace SET3_Backend.Models
{
    public class TableModel
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public int ShopId { get; set; }
        public bool Taken { get; set; }

        public TableModel()
        {
        }

        public TableModel(string name, int shopId, bool taken)
        {
            Name = name;
            ShopId = shopId;
            Taken = taken;
        }
    }
}
