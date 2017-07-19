namespace BugTracking.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UpdatedUserModel : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Users", "Password", c => c.String(nullable: false, maxLength: 16));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Users", "Password");
        }
    }
}
