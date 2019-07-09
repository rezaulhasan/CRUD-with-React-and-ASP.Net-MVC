using OnBoardingTaskReact.Models;
using OnBoardingTaskReact.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OnBoardingTaskReact.Controllers
{
    public class StoreController : Controller
    {
        OnBoardingTaskReactEntities _context = new OnBoardingTaskReactEntities();
        //GET: Home
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult GetStoreList()
        {
            var StoreList = _context.Store.ToList();
            return new JsonResult { Data = StoreList, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        [HttpPost]
        public JsonResult GetStore(int Id)
        {
            var store = _context.Store.Single(m => m.Id == Id);

            //return Json(new { customer }, JsonRequestBehavior.AllowGet);

            return new JsonResult { Data = store, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        [HttpPost]
        public JsonResult Create(StoreViewModel store)
        {
            string result = "";
            if (store.Id == 0)
            {
                var stores = new Store
                {
                    Name = store.Name,
                    Address = store.Address,
                };
                _context.Store.Add(stores);
                _context.SaveChanges();
                result = "New Store Added";
            }

            else
            {
                var storeInDb = _context.Store.SingleOrDefault(m => m.Id == store.Id);

                storeInDb.Name = store.Name;
                storeInDb.Address = store.Address;

                _context.SaveChanges();
                result = "Store details updated";
            }
            return Json(new { result }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult DeleteStore(int Id)
        {
            var store = _context.Store.SingleOrDefault(c => c.Id == Id);
            _context.Store.Remove(store);
            _context.SaveChanges();

            return Json(new { result = "Store Has been deleted" }, JsonRequestBehavior.AllowGet);
        }
    }
}