using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

namespace SeleniumTesting
{
    [TestClass]
    public class UnitTest1
    {
        static IWebDriver driverr;

        [TestMethod]
        public void OtvaranjeStranice() 
        {
            IWebDriver driver = new ChromeDriver();
            string urlstranice = "https://set3front.azurewebsites.net/";
            driver.Navigate().GoToUrl(urlstranice);
        }

        /*
        [ClassInitialize]
        public static void Inicijalizacija(TestContext context)
        {
            driver = new ChromeDriver();
            string urlstranice = "https://www.google.com/";
            driver.Navigate().GoToUrl(urlstranice);

        }
        */
    }
}