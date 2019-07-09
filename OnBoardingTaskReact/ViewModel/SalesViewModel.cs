using OnBoardingTaskReact.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace OnBoardingTaskReact.ViewModel
{
    public class SalesViewModel
    {
        public int Id { get; set; }

        [Display(Name = "Product Name")]
        public int? ProductId { get; set; }

        [Display(Name = "Customer Name")]
        public int? CustomerId { get; set; }

        [Display(Name = "Store Name")]
        public int? StoreId { get; set; }

        public DateTime? DateSold { get; set; }

        public IEnumerable<Customer> Customer { get; set; }
        public IEnumerable<Product> Product { get; set; }
        public IEnumerable<Store> Store { get; set; }

    }
}