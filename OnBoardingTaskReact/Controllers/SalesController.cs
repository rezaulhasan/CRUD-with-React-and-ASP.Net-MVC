using OnBoardingTaskReact.Models;
using OnBoardingTaskReact.ViewModel;
using System.Data.Entity; 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OnBoardingTaskReact.Controllers
{
    public class SalesController : Controller
    {
        OnBoardingTaskReactEntities _context = new OnBoardingTaskReactEntities();

        // GET: Sales
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetSalesList()
        {
            var CustomerNames = from S in _context.Sales
                            join c in _context.Customer on S.CustomerId equals c.Id
                            select  c.Name;

            var ProductNames = from S in _context.Sales
                          join p in _context.Product on S.ProductId equals p.Id
                          select p.Name;

            return Json(new { CustomerNames, ProductNames }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult Create(Sales sale)
        {
            string result = "";
            if (sale.Id == 0)
            {
                var sales = new Sales
                {
                   DateSold = sale.DateSold,
                   ProductId = sale.ProductId,  
                   CustomerId = sale.CustomerId,
                   StoreId = sale.StoreId,
                };
                _context.Sales.Add(sales);
                _context.SaveChanges();
                result = "New sales Added";
            }
            return Json(new { result }, JsonRequestBehavior.AllowGet);
        }

        }
}