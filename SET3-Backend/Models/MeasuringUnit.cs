using System.ComponentModel.DataAnnotations;

namespace SET3_Backend.Models
{
    public class MeasuringUnit
    {
        [Key]
        public int Id { get; set; }
        public string MeasuringUnitName { get; set; }

        public MeasuringUnit(string measuringUnitName)
        {
            MeasuringUnitName = measuringUnitName;
        }

        public MeasuringUnit(int id, string measuringUnitName) : this(measuringUnitName)
        {
            Id = id;
        }
    }

    public enum MeasuringUnitName
    {
        Units = 0,
        Grams = 1,
        Kilograms = 2,
        Milliliters = 3,
        Liters = 4,
        Jars = 5

    }
}
