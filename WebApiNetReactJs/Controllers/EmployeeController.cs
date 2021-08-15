using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using WebApiNetReactJs.Models;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace WebApiNetReactJs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env; // To files

        public EmployeeController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        //Method Get
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select 
                            EmployeeId ,EmployeName, Departament, convert(varchar(10), DateOfJoining, 120) as DateOfJoining, PhotoFileName  
                            from dbo.Employee";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }

        //Method Post
        [HttpPost]
        public JsonResult Post(Employee emp)
        {
            string query = @"insert into dbo.Employee (EmployeName, Departament, DateOfJoining, PhotoFileName)
                           values (@EmployeName, @Departament, @DateOfJoining, @PhotoFileName)";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@EmployeName", emp.EmployeName);
                    myCommand.Parameters.AddWithValue("@Departament", emp.Departament);
                    myCommand.Parameters.AddWithValue("@DateOfJoining", emp.DateOfJoining);
                    myCommand.Parameters.AddWithValue("@PhotoFileName", emp.PhotoFileName);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Add successfully");
        }

        //Method PUT
        [HttpPut]
        public JsonResult Put(Employee emp)
        {
            string query = @"update dbo.Employee set 
                            EmployeName = @EmployeName,
                            Departament = @Departament,                            
                            DateOfJoining = @DateOfJoining,
                            PhotoFileName = @PhotoFileName 
                            where EmployeeId = @EmployeeId";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@EmployeeId", emp.EmployeeId);
                    myCommand.Parameters.AddWithValue("@EmployeName", emp.EmployeName);
                    myCommand.Parameters.AddWithValue("@Departament", emp.Departament);
                    myCommand.Parameters.AddWithValue("@DateOfJoining", emp.DateOfJoining);
                    myCommand.Parameters.AddWithValue("@PhotoFileName", emp.PhotoFileName);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Update successfully");
        }
        //Method DELETE
        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"delete from dbo.Employee
                             where EmployeeId = @EmployeeId";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@EmployeeId", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Delete successfully");
        }

        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Photos/" + filename;

                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }
                   return new JsonResult(filename);
            }
            catch (Exception ex)
            {
                return new JsonResult("anonymous.png");
            }
        }
    }
}
