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
    }
}
