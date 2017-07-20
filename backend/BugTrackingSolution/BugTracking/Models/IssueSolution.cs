using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BugTracking.Models
{
    public class IssueSolution
    {
        [Required]
        public int ID { get; set; }
        [Required]
        [MaxLength(1000)]
        public string Solution { get; set; }
        [Required]
        public DateTime DateEntered { get; set; }

        public int IssueID { get; set; }
        [ForeignKey("IssueID")]
        public virtual Issue Issue { get; set; }

        public int UserID { get; set; }
        [ForeignKey("UserID")]
        public virtual User User { get; set; }

        public void UpdateAll(IssueSolution issueSolution)
        {
            this.Solution = issueSolution.Solution;
            this.DateEntered = issueSolution.DateEntered;
            this.UserID = issueSolution.UserID;
            this.IssueID = issueSolution.IssueID;
        }
    }
}