using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SET3_Backend.Database;
using SET3_Backend.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace SET3_Backend.Controllers
{
    
    [Route("[controller]")]
    [EnableCors("CorsPolicy")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly Context _context;
        private readonly IConfiguration _configuration;

        public class UserToken
        {
            public string Role { get; set; }

            public UserToken(string role)
            {
                Role = role;
            }

        }
        public AuthenticationController(Context context, IConfiguration configuration)
        {
            _configuration = configuration;
            _context = context;
        }

        //metoda napravljena samo za svrhu testiranja!!!
        [HttpGet ("add")]
        public async Task<ActionResult<UserModel>> CreateUserTestMethod()
        {
            Console.WriteLine("inside get");
            RoleModel role = new RoleModel(RoleType.Admin);
            _context.RoleModels.Add(role);
            SecurityQuestionModel question = new SecurityQuestionModel("test pitanje");
            _context.SecurityQuestionModels.Add(question);
            var sha = SHA256.Create();
            var passwordHash = Encoding.ASCII.GetString(sha.ComputeHash(Encoding.ASCII.GetBytes("password")));
            UserModel user = new UserModel("admin@gmail.com", "dzenan", "nuhic",
                passwordHash, role, role.Id, question.Id, "test", false);
            _context.UserModels.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        [EnableCors]
        [HttpPost]
        public async Task<ActionResult<string>> Login([FromBody] UserDto userDto)
        {

            Console.WriteLine("inside post");
            if (userDto == null) return BadRequest("User not specified");
            UserModel user = await _context.UserModels.Where(u => u.Email.Equals(userDto.Email)).FirstOrDefaultAsync();
            var sha = SHA256.Create();
            var passwordHash = Encoding.ASCII.GetString(sha.ComputeHash(Encoding.ASCII.GetBytes(userDto.Password)));
            Console.WriteLine(passwordHash);
            Console.WriteLine(userDto.Password);
            if (user == null || !passwordHash.Equals(user.Password))
            {
                return BadRequest("Incorrect email or password.");
            }
            //treba provjeriti da li je nesto od ovoga null
            user.Role = await _context.RoleModels.FindAsync(user.RoleId);
            //user.Question = await _context.SecurityQuestionModels.FindAsync(user.QuestionId);
            string token = CreateToken(user);

            CookieOptions cookieOptions = new CookieOptions();
            cookieOptions.Secure = true;
            cookieOptions.HttpOnly = false;
            cookieOptions.Expires = DateTime.UtcNow.AddMinutes(30);
            Response.Cookies.Append("jwt", token, cookieOptions);

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

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: credentials
                );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }

        private Tuple<string, string, string> GetUserFromToken(JwtSecurityToken jwtSecurityToken)
        {
            //ovo bi se moglo napraviti da nekad vraca user-a, ali prvo treba vidjeti sta ce se
            //desiti sa atributima role i security question
            var name = jwtSecurityToken.Claims.First(claim => claim.Type == ClaimTypes.Name).Value;
            var email = jwtSecurityToken.Claims.First(claim => claim.Type == ClaimTypes.Email).Value;
            var role = jwtSecurityToken.Claims.First(claim => claim.Type == ClaimTypes.Role).Value;
            return new Tuple<string, string, string>(name, email, role);
        }

        [HttpGet("getUserId")]
        public async Task<ActionResult<UserModel>> getUserIdFromToken()
        {

            var token = Request.Headers["Authorization"];
            token = token.ToString().Substring(token.ToString().IndexOf(" ") + 1);
            

            /*var handler = new JwtSecurityTokenHandler();
            JwtSecurityToken token = handler.ReadJwtToken(jsontoken);*/

            var tokenUser = GetUserFromToken(ValidateToken(token));

            var user = _context.UserModels.AsNoTracking().Where(u => u.Email == tokenUser.Item2).FirstOrDefault();
            if (user is not null)
                return user;
            return BadRequest();
        }

        [EnableCors]
        [HttpPost("getusertoken")]
        public async Task<ActionResult<UserToken>> GetUserToken()
        {
            System.Diagnostics.Debug.WriteLine(HttpContext.Request.Body);
            string body;
           

            using (var reader = new StreamReader(Request.Body))
            {
                body = await reader.ReadToEndAsync();

                // Do something
            }

            String jsontoken = body.Split("=")[1].Replace("\"", "");
            System.Diagnostics.Debug.WriteLine(jsontoken);

            /*var handler = new JwtSecurityTokenHandler();
            JwtSecurityToken token = handler.ReadJwtToken(jsontoken);*/

            var tokenUser = GetUserFromToken(ValidateToken(jsontoken));
            UserToken userToken = new UserToken(tokenUser.Item3);

 
            return userToken;
        }

        private JwtSecurityToken ValidateToken(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            TokenValidationParameters validationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value)),
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero
            };
            try
            {
                handler.ValidateToken(token, validationParameters, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;
                return jwtToken;
            }
            catch
            {
                return null;
            }
        }
    }
}
