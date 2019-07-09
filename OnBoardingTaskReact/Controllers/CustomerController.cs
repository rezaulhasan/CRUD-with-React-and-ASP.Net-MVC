using OnBoardingTaskReact.Models;
using OnBoardingTaskReact.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OnBoardingTaskReact.Controllers
{
    public class CustomerController : Controller
    {
        OnBoardingTaskReactEntities _context = new OnBoardingTaskReactEntities();
        //GET: Home
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult GetCustomerList()
        {
            var CustomerList = _context.Customer.ToList();
            return new JsonResult { Data = CustomerList, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        [HttpPost]
        public JsonResult GetCustomer(int Id)
        {
            var customer = _context.Customer.Single(m => m.Id == Id);

            //return Json(new { customer }, JsonRequestBehavior.AllowGet);

            return new JsonResult { Data = customer, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        [HttpPost]
        public JsonResult Create(CustomerViewModel customer)
        {
            string result = "";
            if (customer.Id == 0)
            {
                var customers = new Customer
                {
                    Name = customer.Name,
                    Address = customer.Address,
                };
                _context.Customer.Add(customers);
                _context.SaveChanges();
                result = "New Customer Added";
            }

            else
            {
                var customerInDb = _context.Customer.SingleOrDefault(m => m.Id == customer.Id);

                customerInDb.Name = customer.Name;
                customerInDb.Address = customer.Address;

                _context.SaveChanges();
                result = "Customer details updated";
            }
            return Json(new { result }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult DeleteCustomer(int Id)
        {
            var customer = _context.Customer.SingleOrDefault(c => c.Id == Id);
            _context.Customer.Remove(customer);
            _context.SaveChanges();

            return Json(new { result = "Customer Has been deleted" }, JsonRequestBehavior.AllowGet);
        }
    }
}