using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SET3_Backend.Database;
using SET3_Backend.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SET3_Backend.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("CorsPolicy")]
    [ApiController]
    public class ResetPasswordController : ControllerBase
    {

        private readonly Context _context;

        public ResetPasswordController(Context context)
        {
            _context = context;
        }

        // GET: api/<ResetPasswordController>
        [HttpGet]
        //[HttpGet, Authorize(Roles = "Admin, User")]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<ResetPasswordController>/5
        [HttpGet("{id}")]
        //[HttpGet("{id}"), Authorize(Roles = "Admin, User")]
        public string Get(int id)
        {
            return "value";
        }


        // PUT api/<ResetPasswordController>/5
        [HttpPut("{id}")]
        //[HttpPut("{id}"), Authorize(Roles = "Admin")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ResetPasswordController>/5
        [HttpDelete("{id}")]
        //[HttpDelete("{id}"), Authorize(Roles = "Admin")]
        public void Delete(int id)
        {
        }
    }
}
