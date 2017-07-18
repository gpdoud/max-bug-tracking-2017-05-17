using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BugTracking.Models {
    public class Issue {
        [Required]
        public int ID { get; set; }
        [Required]
        [MaxLength(255)]
        public string Description { get; set; }
        [Required]
        public DateTime DateEntered { get; set; }
        [Required]
        [MaxLength(25)]
        public string Severity { get; set; }
        [Required]
        [MaxLength(25)]
        public string Priority { get; set; }
        [Required]
        [MaxLength(25)]
        public string Status { get; set; }
        
        public int SubmittedByUserID { get; set; }
        public virtual User SubmittedByUser { get; set; }

        public int ResolvingUserID { get; set; }
        public virtual User ResolvingUser { get; set; }
    }
}