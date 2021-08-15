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

namespace WebApiNetReactJs.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class DepartamentController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public DepartamentController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        //Method Get
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select DepartamentId, DepartamentName from dbo.Departament";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;

            using(SqlConnection myCon = new SqlConnection(sqlDataSource))
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
        public JsonResult Post(Departament dep)
        {
            string query = @"insert into dbo.Departament values (@DepartamentName)";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@DepartamentName", dep.DepartamentName);
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
        public JsonResult Put(Departament dep)
        {
            string query = @"update dbo.Departament set DepartamentName = @DepartamentName
                             where DepartamentId = @DepartamentId";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@DepartamentId", dep.DepartamentId);
                    myCommand.Parameters.AddWithValue("@DepartamentName", dep.DepartamentName);
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
            string query = @"
                            DELETE FROM Departament 
                            WHERE DepartamentId=@DepartamentId
                            ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@DepartamentId", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            //return new JsonResult(id);
            return new JsonResult("Delete successfully");
        }
    }
}
