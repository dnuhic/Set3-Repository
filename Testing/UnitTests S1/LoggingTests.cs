using NUnit.Framework;
using SET3_Backend.Models;
using SET3_Backend.Database;
using SET3_Backend.Controllers;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RestSharp;
using Microsoft.AspNetCore.Http;
using System.Net.Http;
using System;



namespace Testing.UnitTests_S1
{
    public class LoggingTests
    {
        private Context _context;
        private ILogger<UserModelsController> _logger;
        private string? token;
        private int _randNum;
        private string link = "https://localhost:5194";

        public LoggingTests(Context context, ILogger<UserModelsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        private async Task<LoggingModel> GetLastLog()
        {
            return await _context!.LoggingModels.Include(item => item.Action).LastOrDefaultAsync();
        }

        [SetUp]
        public void Setup()
        {
            _randNum = new Random().Next();
            var userModelController = new UserModelsController(_context, _logger);
            userModelController.ControllerContext = new Microsoft.AspNetCore.Mvc.ControllerContext()
            {
                HttpContext = new DefaultHttpContext()
            };
        }

        [Test]
        public async Task LogAddUser()
        {
            var client = new RestClient(link);
            var request = new RestRequest("api/UserModels", Method.Post);
            request.AddHeader("Content-Type", "application/json");
            
            var credentials = new

            {
                Id = 1,
                FirstName = "Amar",
                LastName = "Begovac",
                QuestionId = 1,
                Anwser = "Babaroga",
                Email = $"abegovac2{_randNum}@etf.unsa.ba",
                Password = "idegassamozanas",
                Deleted = false

            };
            var jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(credentials);
            request.AddParameter("application/json", jsonString, ParameterType.RequestBody);
            RestResponse response = await client.ExecuteAsync(request);
            var result = await GetLastLog();
            Assert.IsNotNull(result);
            Assert.AreEqual(result.Action.actionType, ActionType.SignedUp);
        }

        [Test]
        public async Task DeleteUserTest()
        {
            var client = new RestClient("https://localhost:7194");
            var request = new RestRequest($"api/UserModels/{1}", Method.Post);
            request.AddHeader("Content-Type", "application/json");
            RestResponse response = await client.ExecuteAsync(request);
            var result = await GetLastLog();
            Assert.IsNotNull(result);
            Assert.AreEqual(result.Action.actionType, ActionType.DeletedUser);

        }
    }
}