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
    public class IssuesController : Controller
    {
        private BugTrackingContext db = new BugTrackingContext();

        public ActionResult List()
        {
            var data = db.Issues.ToList();
            return new JsonNetResult{ Data = data };
        }

        public ActionResult Get(int? id)
        {
            if (id == null)
            {
                return Json(new Msg { Result = "Failed", Message = "Issue not found" }, JsonRequestBehavior.AllowGet);
            }

            var data = db.Issues.Find(id);
            return new JsonNetResult { Data = data };
        }

        public ActionResult Remove(int? id)
        {
            if (id == null || db.Issues.Find(id) == null)
            {
                return Json(new Msg { Result = "Failed", Message = "Issue not found" }, JsonRequestBehavior.AllowGet);
            }

            Issue issue = db.Issues.Find(id);
            db.Issues.Remove(issue);
            db.SaveChanges();
            return Json(new Msg { Result = "OK", Message = "Successfully deleted" }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Add([Api.FromBody] Issue issue)
        {
            if (issue == null)
            {
                return Json(new Msg { Result = "Failure", Message = "Issue is empty" }, JsonRequestBehavior.AllowGet);
            }

            db.Issues.Add(issue);
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

        public ActionResult Change([Api.FromBody] Issue aIssue)
        {
            if (aIssue.ID == 0)
            {
                return Json(new Msg { Result = "Failure", Message = "aIssue is empty" }, JsonRequestBehavior.AllowGet);
            }

            Issue issue = db.Issues.Find(aIssue.ID);
            issue.UpdateAll(aIssue);

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

        // GET: Issues
        public ActionResult Index()
        {
            return View(db.Issues.ToList());
        }

        // GET: Issues/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Issue issue = db.Issues.Find(id);
            if (issue == null)
            {
                return HttpNotFound();
            }
            return View(issue);
        }

        // GET: Issues/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Issues/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ID,Description,DateEntered,Severity,Priority,Status,SubmittedByUserID,ResolvingUserID")] Issue issue)
        {
            if (ModelState.IsValid)
            {
                db.Issues.Add(issue);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(issue);
        }

        // GET: Issues/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Issue issue = db.Issues.Find(id);
            if (issue == null)
            {
                return HttpNotFound();
            }
            return View(issue);
        }

        // POST: Issues/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID,Description,DateEntered,Severity,Priority,Status,SubmittedByUserID,ResolvingUserID")] Issue issue)
        {
            if (ModelState.IsValid)
            {
                db.Entry(issue).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(issue);
        }

        // GET: Issues/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Issue issue = db.Issues.Find(id);
            if (issue == null)
            {
                return HttpNotFound();
            }
            return View(issue);
        }

        // POST: Issues/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Issue issue = db.Issues.Find(id);
            db.Issues.Remove(issue);
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
