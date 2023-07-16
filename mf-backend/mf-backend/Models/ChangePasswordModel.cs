﻿using System.ComponentModel.DataAnnotations;

namespace mf_backend.Models
{
    public class ChangePasswordModel
    {
        public int AccountID { get; set; }

        [Required]
        public string CurrentPassword { get; set; }

        [Required]
        public string NewPassword { get; set; }
    }
}
