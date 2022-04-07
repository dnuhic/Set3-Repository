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

        [HttpGet("createFirstData")]
        public async Task<ActionResult<UserModel>> CreateFirstData()
        {
            if (!_context.RoleModels.Any())
            {
                RoleModel user = new RoleModel(RoleType.User.ToString(), true, false, false);
                _context.RoleModels.Add(user);

                RoleModel admin = new RoleModel(RoleType.Admin.ToString(), true, true, true);
                _context.RoleModels.Add(admin);

                RoleModel shopAdmin = new RoleModel(RoleType.ShopAdmin.ToString(), true, true, true);
                _context.RoleModels.Add(shopAdmin);

                RoleModel stockAdmin = new RoleModel(RoleType.StockAdmin.ToString(), true, true, true);
                _context.RoleModels.Add(stockAdmin);


            }

            if (!_context.SecurityQuestionModels.Any())
            {
                _context.SecurityQuestionModels.Add(new SecurityQuestionModel("What is your favourite animal?"));
                _context.SecurityQuestionModels.Add(new SecurityQuestionModel("What is your favourite color?"));
                _context.SecurityQuestionModels.Add(new SecurityQuestionModel("What is your mothers name?"));
                _context.SecurityQuestionModels.Add(new SecurityQuestionModel("What is your dream destination?"));
                _context.SecurityQuestionModels.Add(new SecurityQuestionModel("What is your dream car?"));
            }

            if (!_context.CategoryModels.Any())
            {
                _context.CategoryModels.Add(new CategoryModel(CategoryType.Food.ToString()));
                _context.CategoryModels.Add(new CategoryModel(CategoryType.Hygiene.ToString()));
                _context.CategoryModels.Add(new CategoryModel(CategoryType.Clothes.ToString()));
                _context.CategoryModels.Add(new CategoryModel(CategoryType.Other.ToString()));
            }

            if (!_context.StockModels.Any())
            {
                _context.StockModels.Add(new StockModel("Warehouse"));
            }

            await _context.SaveChangesAsync();
            return Ok();
        }

        //metoda napravljena samo za svrhu testiranja!!!
        [HttpGet ("add")]
        public async Task<ActionResult<List<UserModel>>> CreateUserTestMethod()
        {
            if (_context.RoleModels.Any() && _context.SecurityQuestionModels.Any())
            {
                SecurityQuestionModel question = await _context.SecurityQuestionModels.FirstOrDefaultAsync();
                List<UserModel> users = new List<UserModel>();
                var sha = SHA256.Create();
                var passwordHash = Encoding.ASCII.GetString(sha.ComputeHash(Encoding.ASCII.GetBytes("password")));

                users.Add(new UserModel("admin@gmail.com", "Admin", "Admin", passwordHash, question!.Id, "Odgovor", false, RoleType.Admin.ToString(), ""));
                users.Add(new UserModel("shopAdmin@gmail.com", "Shop", "Admin", passwordHash, question!.Id, "Odgovor", false, RoleType.ShopAdmin.ToString(), ""));
                users.Add(new UserModel("stockAdmin@gmail.com", "Stock", "Admin", passwordHash, question!.Id, "Odgovor", false, RoleType.StockAdmin.ToString(), ""));
                _context.UserModels.AddRange(users);
                await _context.SaveChangesAsync();
                return users;
            }

            // AKO VRATI BAD REQUEST POZOVITE SLIJEDECI GET PRIJE:
            return BadRequest();
                
            
        }

        [EnableCors("CorsPolicy")]
        [HttpPost]
        public async Task<ActionResult<TFAModel>> Login(UserDto userDto)
        {

            Console.WriteLine("inside post");
            if (userDto == null) new TFAModel("ERROR");
            UserModel user = await _context.UserModels.Where(u => u.Email.Equals(userDto.Email)).FirstOrDefaultAsync();
            var sha = SHA256.Create();
            var passwordHash = Encoding.ASCII.GetString(sha.ComputeHash(Encoding.ASCII.GetBytes(userDto.Password)));
            Console.WriteLine(passwordHash);
            Console.WriteLine(userDto.Password);
            if (user == null || !passwordHash.Equals(user.Password))
            {
                return new TFAModel("ERROR");
            }
            //user.Question = await _context.SecurityQuestionModels.FindAsync(user.QuestionId);
            string token = CreateToken(user);

            CookieOptions cookieOptions = new CookieOptions();
            cookieOptions.Secure = false;
            cookieOptions.HttpOnly = false;
            cookieOptions.Expires = DateTime.UtcNow.AddMinutes(30);
            cookieOptions.SameSite = SameSiteMode.None;
            Response.Cookies.Append("jwt", token, cookieOptions);

            return new TFAModel(token);
        }

        protected string CreateToken(UserModel user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, Enum.GetName(typeof(RoleType), Enum.Parse<RoleType>(user.RoleName))),
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

        protected Tuple<string, string, string> GetUserFromToken(JwtSecurityToken jwtSecurityToken)
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

        [HttpGet("getUserTFA/{email}")]
        public async Task<ActionResult<TFAModel>> getUserTFA(string email)
        {
            /*var handler = new JwtSecurityTokenHandler();
            JwtSecurityToken token = handler.ReadJwtToken(jsontoken);*/

            var user = _context.UserModels.AsNoTracking().Where(u => u.Email == email).FirstOrDefault();
            
            return new TFAModel(user.TFA);
        }

        [EnableCors("CorsPolicy")]
        [HttpPost("getusertoken")]
        public async Task<ActionResult<UserToken>> GetUserToken()
        {
            var body = "";
            using (var reader = new StreamReader(Request.Body))
            {
                body = await reader.ReadToEndAsync();
            }

            var cookies = body.Split(';');
            var cookie = "";
            foreach(var kuki in cookies) {
                if (kuki.Contains("jwt")) { 
                    cookie= kuki;
                    cookie.Trim();
                }
            }

            if (cookie.IsNullOrEmpty()) return BadRequest("no jwt cookie found");

            String jsontoken = cookie.Split("=")[1].Replace("\"", "");
            System.Diagnostics.Debug.WriteLine(jsontoken);

            /*var handler = new JwtSecurityTokenHandler();
            JwtSecurityToken token = handler.ReadJwtToken(jsontoken);*/

            var tokenUser = GetUserFromToken(ValidateToken(jsontoken));
            UserToken userToken = new UserToken(tokenUser.Item3);

 
            return userToken;
        }

        protected JwtSecurityToken ValidateToken(string token)
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
