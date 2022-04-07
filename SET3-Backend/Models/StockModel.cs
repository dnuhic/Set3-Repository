using System.ComponentModel.DataAnnotations;

namespace SET3_Backend.Models
{
    public class StockModel //SKLADISTE
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }

        public StockModel(string name)
        {
            Name = name;
        }
    }
}
