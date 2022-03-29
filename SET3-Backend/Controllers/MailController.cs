using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
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
                //var korisnik = context.UserModels.Select(x => x.Email == request.ToEmail);
                //if(korisnik != null)
                    await mailService.SendEmailAsync(request);
                return Ok();
            }
            catch (Exception ex)
            {
                throw;
            }

        }
    }
}
