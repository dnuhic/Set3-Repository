using System.ComponentModel.DataAnnotations;

namespace SET3_Backend.Models
{
    public class CategoryModel
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }

        public double Tax { get; set; }

        public CategoryModel(string name, double tax)
        {
            Name = name;
            Tax = tax;
        }
    }

    public enum CategoryType
    {
        Food = 0,
        Hygiene = 1,
        Clothes = 2,
        Other = 3   
    }
}
