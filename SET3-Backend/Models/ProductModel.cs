﻿using System.ComponentModel.DataAnnotations;

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
        public float Quantity { get; set; }

        public string Barcode { get; set; }

        public string BarcodeText { get; set; }



    }


}
