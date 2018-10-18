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
                        Description = c.String(nullable: false, maxLength: 1000),
                        DateEntered = c.DateTime(nullable: false),
                        Severity = c.String(nullable: false, maxLength: 25),
                        Priority = c.String(nullable: false, maxLength: 25),
                        Status = c.String(nullable: false, maxLength: 25),
                        Solution = c.String(maxLength: 2000),
                        SubmittedByUserID = c.Int(nullable: false),
                        ResolvedByUserID = c.Int(),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.Users", t => t.ResolvedByUserID)
                .ForeignKey("dbo.Users", t => t.SubmittedByUserID, cascadeDelete: true)
                .Index(t => t.SubmittedByUserID)
                .Index(t => t.ResolvedByUserID);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 255),
                        Email = c.String(nullable: false, maxLength: 255),
                        Password = c.String(nullable: false, maxLength: 16),
                        Role = c.String(nullable: false, maxLength: 100),
                    })
                .PrimaryKey(t => t.ID);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Issues", "SubmittedByUserID", "dbo.Users");
            DropForeignKey("dbo.Issues", "ResolvedByUserID", "dbo.Users");
            DropIndex("dbo.Issues", new[] { "ResolvedByUserID" });
            DropIndex("dbo.Issues", new[] { "SubmittedByUserID" });
            DropTable("dbo.Users");
            DropTable("dbo.Issues");
        }
    }
}
