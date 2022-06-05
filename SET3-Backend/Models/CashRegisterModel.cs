using System.ComponentModel.DataAnnotations;

namespace SET3_Backend.Models
{
    public class CashRegisterModel
    {
        [Key]
        public int Id { get; set; }
        public int ShopId { get; set; }
        public bool Deleted { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }

        public bool Installed { get; set; }

        public CashRegisterModel(int shopId, bool deleted, string name, string description, bool installed)
        {
            ShopId = shopId;
            Deleted = deleted;
            Name = name;
            Description = description;
            Installed = installed;
        }

        public CashRegisterModel(int id, int shopId, bool deleted, string name, string description, bool installed) : this(shopId, deleted, name, description, installed){
            Id = id;
        }
    }
}
