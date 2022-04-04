using System.ComponentModel.DataAnnotations;

namespace SET3_Backend.Models
{
    public class ProductModel
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string CategoryName { get; set; }

        public float Price { get; set; }
    }

 
}
