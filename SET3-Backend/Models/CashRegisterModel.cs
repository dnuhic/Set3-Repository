﻿using System.ComponentModel.DataAnnotations;

namespace SET3_Backend.Models
{
    public class CashRegisterModel
    {
        [Key]
        public int Id { get; set; }
        public int ShopId { get; set; }
        public bool Deleted { get; set; }
    }
}