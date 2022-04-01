using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using SET3_Backend.Database;
using SET3_Backend.Models;
using SET3_Backend.Services;
using System.Security.Cryptography;
using System.Text;

namespace SET3_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("CorsPolicy")]
    public class MailController : ControllerBase
    {
        private readonly IMailService mailService;
        private readonly Context context;

        public MailController(IMailService mailService, Context context)
        {
            this.mailService = mailService;
            this.context = context;
        }

        [HttpPost("send")]
        public async Task<IActionResult> SendMail(MailRequest request)
        {
           
            try
            {
                // dodati provjeru !!!
                var user = context.UserModels.Where(u => u.Email == request.ToEmail).FirstOrDefault();
                if (user != null)
                {
                    await mailService.SendEmailAsync(request);
                    return Ok();
                }
                else return BadRequest();
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        [HttpPost("reset")]
        public async Task<IActionResult> ResetPassword(ResetPasswordModel obj)
        {
            var email = DecryptString(obj.id);

            var sha = SHA256.Create();
            var passwordHash = Encoding.ASCII.GetString(sha.ComputeHash(Encoding.ASCII.GetBytes(obj.Password)));

            var user = context.UserModels.Where(u => u.Email == email).First();
            if (user is not null) { 
                user.Password = passwordHash;

                context.Update(user);
                await context.SaveChangesAsync();

                return Ok();
            }
            return BadRequest();
        }

        public string DecryptString(string encrString)
        {
            byte[] b;
            string decrypted;
            try
            {
                b = Convert.FromBase64String(encrString);
                decrypted = System.Text.ASCIIEncoding.ASCII.GetString(b);
            }
            catch (FormatException fe)
            {
                decrypted = "";
            }
            return decrypted;
        }

        public string EnryptString(string strEncrypted)
        {
            byte[] b = System.Text.ASCIIEncoding.ASCII.GetBytes(strEncrypted);
            string encrypted = Convert.ToBase64String(b);
            return encrypted;
        }
    }
}
