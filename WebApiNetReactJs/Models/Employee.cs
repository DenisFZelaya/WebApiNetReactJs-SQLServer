using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiNetReactJs.Models
{
    public class Employee
    {
        public int EmployeeId { get; set; }
        public string EmployeName { get; set; }
        public string Departament { get; set; }
        public string DateOfJoining { get; set; }
        public string PhotoFileName { get; set; }
    }
}
