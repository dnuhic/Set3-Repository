using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SET3_Backend.Database;
using SET3_Backend.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace SET3_Backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly Context _context;
        private readonly IConfiguration _configuration;

        public AuthenticationController(Context context, IConfiguration configuration)
        {
            _configuration = configuration;
            _context = context;
        }

        //metoda napravljena samo za svrhu testiranja!!!
        [HttpGet]
        public async Task<ActionResult<UserModel>> CreateUserTestMethod()
        {
            RoleModel role = new RoleModel(RoleType.Admin);
            _context.RoleModels.Add(role);
            SecurityQuestionModel question = new SecurityQuestionModel("test pitanje");
            _context.SecurityQuestionModels.Add(question);
            UserModel user = new UserModel("dzenan.nuhic@gmail.com", "dzenan", "nuhic",
                "password", role, role.Id, question, question.Id, "test", false);
            _context.UserModels.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        [HttpPost]
        public async Task<ActionResult<string>> Login(UserDto userDto) 
        {
            if (userDto == null) return BadRequest("User not specified");
            UserModel user = await _context.UserModels.Where(u => u.Email.Equals(userDto.Email)).FirstOrDefaultAsync();
            if(user == null && userDto.Password.Equals(user.Password))
            {
                return BadRequest("Incorrect email or password.");
            }
            //treba provjeriti da li je nesto od ovoga null
            user.Role = await _context.RoleModels.FindAsync(user.RoleId);
            user.Question = await _context.SecurityQuestionModels.FindAsync(user.QuestionId);
            string token = CreateToken(user);
            return Ok(token);
        }

        private string CreateToken(UserModel user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, Enum.GetName(typeof(RoleType), user.Role.RoleType)),
                new Claim(ClaimTypes.Name, user.FirstName + " " + user.LastName)
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddMinutes(5),
                signingCredentials: credentials
                );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            //kako dekodirati token:
            //var handler = new JwtSecurityTokenHandler();
            //var decodedToken = handler.ReadJwtToken(jwt);
            //var Name = decodedToken.Claims.First(claim => claim.Type == ClaimTypes.Name).Value;
            //var Email = decodedToken.Claims.First(claim => claim.Type == ClaimTypes.Email).Value;
            //var Role = decodedToken.Claims.First(claim => claim.Type == ClaimTypes.Role).Value;
            return jwt;
        }
    }
}
