using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using SET3_Backend.Database;
using SET3_Backend.Models;
using SET3_Backend.Services;

namespace SET3_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("CorsPolicy")]
    public class MailController : ControllerBase
    {
        private readonly IMailService mailService;
        private readonly Context context;
        private readonly ILogger<MailController> logger;

        public MailController(IMailService mailService, Context context, ILogger<MailController> logger)
        {
            this.mailService = mailService;
            this.context = context;
            this.logger = logger;
        }

        [HttpPost("send")]
        public async Task<IActionResult> SendMail(MailRequest request)
        {
           
            try
            {
                logger.LogInformation("Sending Email Started");
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

            logger.LogInformation("Sending Email Finished");

        }

        [HttpPost("reset")]
        public async Task<IActionResult> ResetPassword(ResetPasswordModel obj)
        {
            logger.LogInformation("Reset Password Started");
            var email = DecryptString(obj.id);

            var user = context.UserModels.Where(u => u.Email == email).First();
            if (user is not null) { 
                user.Password = obj.Password;

                context.Update(user);
                await context.SaveChangesAsync();

                logger.LogInformation("Reset Password Done");
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
