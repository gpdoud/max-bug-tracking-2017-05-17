using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using BugTracking.Models;
using Api = System.Web.Http;

namespace BugTracking.Controllers
{
    public class IssueSolutionsController : Controller
    {
        private BugTrackingContext db = new BugTrackingContext();

        public ActionResult List()
        {
            var data = db.IssueSolutions.ToList();
            return new JsonNetResult { Data = data };
        }

        public ActionResult ListByUser(int? id)
        {
            if (id == null)
            {
                return null;
            }

            var data = db.IssueSolutions.Where(i => i.UserID == id).ToList();
            return new JsonNetResult { Data = data };
        }

        public ActionResult GetByIssueID(int? id)
        {
            if (id == null)
            {
                return Json(new Msg { Result = "Failed", Message = "Issue Solution not found" }, JsonRequestBehavior.AllowGet);
            }

            var data = db.IssueSolutions.Where(i => i.IssueID == id);
            return new JsonNetResult { Data = data };
        }

        public ActionResult Get(int? id)
        {
            if (id == null)
            {
                return Json(new Msg { Result = "Failed", Message = "Issue Solution not found" }, JsonRequestBehavior.AllowGet);
            }

            var data = db.IssueSolutions.Find(id);
            return new JsonNetResult { Data = data };
        }

        public ActionResult Remove(int? id)
        {
            if (id == null || db.IssueSolutions.Find(id) == null)
            {
                return Json(new Msg { Result = "Failed", Message = "Issue Solution not found" }, JsonRequestBehavior.AllowGet);
            }

            IssueSolution issueSolution = db.IssueSolutions.Find(id);
            db.IssueSolutions.Remove(issueSolution);
            db.SaveChanges();
            return Json(new Msg { Result = "OK", Message = "Successfully deleted" }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Add([Api.FromBody] IssueSolution issueSolution)
        {
            if (issueSolution == null)
            {
                return Json(new Msg { Result = "Failure", Message = "Issue Solution is empty" }, JsonRequestBehavior.AllowGet);
            }

            db.IssueSolutions.Add(issueSolution);
            try
            {
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                var e = ex;
            }

            return Json(new Msg { Result = "OK", Message = "Successfully added" }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Change([Api.FromBody] IssueSolution aIssueSolution)
        {
            if (aIssueSolution.ID == 0)
            {
                return Json(new Msg { Result = "Failure", Message = "aIssue is empty" }, JsonRequestBehavior.AllowGet);
            }

            IssueSolution issueSolution = db.IssueSolutions.Find(aIssueSolution.ID);
            issueSolution.UpdateAll(aIssueSolution);

            try
            {
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                var e = ex;
            }

            return Json(new Msg { Result = "OK", Message = "Successfully updated" }, JsonRequestBehavior.AllowGet);
        }

        // GET: IssueSolutions
        public ActionResult Index()
        {
            var issueSolutions = db.IssueSolutions.Include(i => i.Issue).Include(i => i.User);
            return View(issueSolutions.ToList());
        }

        // GET: IssueSolutions/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            IssueSolution issueSolution = db.IssueSolutions.Find(id);
            if (issueSolution == null)
            {
                return HttpNotFound();
            }
            return View(issueSolution);
        }

        // GET: IssueSolutions/Create
        public ActionResult Create()
        {
            ViewBag.IssueID = new SelectList(db.Issues, "ID", "Description");
            ViewBag.UserID = new SelectList(db.Users, "ID", "Name");
            return View();
        }

        // POST: IssueSolutions/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ID,Solution,DateEntered,IssueID,UserID")] IssueSolution issueSolution)
        {
            if (ModelState.IsValid)
            {
                db.IssueSolutions.Add(issueSolution);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.IssueID = new SelectList(db.Issues, "ID", "Description", issueSolution.IssueID);
            ViewBag.UserID = new SelectList(db.Users, "ID", "Name", issueSolution.UserID);
            return View(issueSolution);
        }

        // GET: IssueSolutions/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            IssueSolution issueSolution = db.IssueSolutions.Find(id);
            if (issueSolution == null)
            {
                return HttpNotFound();
            }
            ViewBag.IssueID = new SelectList(db.Issues, "ID", "Description", issueSolution.IssueID);
            ViewBag.UserID = new SelectList(db.Users, "ID", "Name", issueSolution.UserID);
            return View(issueSolution);
        }

        // POST: IssueSolutions/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID,Solution,DateEntered,IssueID,UserID")] IssueSolution issueSolution)
        {
            if (ModelState.IsValid)
            {
                db.Entry(issueSolution).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.IssueID = new SelectList(db.Issues, "ID", "Description", issueSolution.IssueID);
            ViewBag.UserID = new SelectList(db.Users, "ID", "Name", issueSolution.UserID);
            return View(issueSolution);
        }

        // GET: IssueSolutions/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            IssueSolution issueSolution = db.IssueSolutions.Find(id);
            if (issueSolution == null)
            {
                return HttpNotFound();
            }
            return View(issueSolution);
        }

        // POST: IssueSolutions/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            IssueSolution issueSolution = db.IssueSolutions.Find(id);
            db.IssueSolutions.Remove(issueSolution);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
