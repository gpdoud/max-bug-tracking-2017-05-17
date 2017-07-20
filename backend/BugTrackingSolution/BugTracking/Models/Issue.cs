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
        [MaxLength(1000)]
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
        public int? ResolvedByUserID { get; set; }

        [ForeignKey("SubmittedByUserID")]
        public virtual User SubmittedByUser { get; set; }
        [ForeignKey("ResolvedByUserID")]
        public virtual User ResolvedByUser { get; set; }

        public void UpdateAll(Issue issue)
        {
            this.Description = issue.Description;
            this.DateEntered = issue.DateEntered;
            this.Severity = issue.Severity;
            this.Priority = issue.Priority;
            this.Status = issue.Status;
            this.SubmittedByUserID = issue.SubmittedByUserID;
            this.ResolvedByUserID = issue.ResolvedByUserID;
        }
    }
}