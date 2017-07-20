﻿using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace BugTracking.Models
{
    public class BugTrackingContext : DbContext
    {
        // You can add custom code to this file. Changes will not be overwritten.
        // 
        // If you want Entity Framework to drop and regenerate your database
        // automatically whenever you change your model schema, please use data migrations.
        // For more information refer to the documentation:
        // http://msdn.microsoft.com/en-us/data/jj591621.aspx

        public BugTrackingContext() : base("name=BugTrackingContext")
        {

        }

        public System.Data.Entity.DbSet<BugTracking.Models.Issue> Issues { get; set; }

        public System.Data.Entity.DbSet<BugTracking.Models.User> Users { get; set; }

        public System.Data.Entity.DbSet<BugTracking.Models.IssueSolution> IssueSolutions { get; set; }
    }
}
