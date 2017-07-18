namespace BugTracking.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initialization : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Issues",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Description = c.String(nullable: false, maxLength: 255),
                        DateEntered = c.DateTime(nullable: false),
                        Severity = c.String(nullable: false, maxLength: 25),
                        Priority = c.String(nullable: false, maxLength: 25),
                        Status = c.String(nullable: false, maxLength: 25),
                        SubmittedByUserID = c.Int(nullable: false),
                        ResolvingUserID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ID);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 255),
                        Email = c.String(nullable: false, maxLength: 255),
                        Role = c.String(nullable: false, maxLength: 100),
                    })
                .PrimaryKey(t => t.ID);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Users");
            DropTable("dbo.Issues");
        }
    }
}