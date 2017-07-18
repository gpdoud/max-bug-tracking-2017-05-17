using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BugTracking.Models {
    public class User {
        [Required]
        public int ID { get; set; }
        [Required]
        [MaxLength(255)]
        public string Name { get; set; }
        [Required]
        [MaxLength(255)]
        public string Email { get; set; }
        [Required]
        [MaxLength(100)]
        public string Role { get; set; }

        public void UpdateAll(User user)
        {
            this.Name = user.Name;
            this.Email = user.Email;
            this.Role = user.Role;
        }
    }
}