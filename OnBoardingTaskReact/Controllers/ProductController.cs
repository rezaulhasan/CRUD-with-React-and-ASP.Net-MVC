using OnBoardingTaskReact.Models;
using OnBoardingTaskReact.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OnBoardingTaskReact.Controllers
{
    public class ProductController : Controller
    {
        OnBoardingTaskReactEntities _context = new OnBoardingTaskReactEntities();

        // GET: Product
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult GetProductList()
        {
            var ProductList = _context.Product.ToList();
            return new JsonResult { Data = ProductList, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

    }
}