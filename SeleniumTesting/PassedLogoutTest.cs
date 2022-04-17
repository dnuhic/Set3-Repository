using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System.Threading;

namespace SeleniumTesting
{
    [TestClass]
    public class PassedLogoutTest
    {
        static IWebDriver driver;
        [ClassInitialize]
        public static void Inicijalizacija(TestContext context)
        {
            driver = new ChromeDriver();
            string urlstranice = "https://localhost:3000/";
            driver.Navigate().GoToUrl(urlstranice);
            Thread.Sleep(500);
            IWebElement buttonLogin = driver.FindElement(By.ClassName("navbar-nav"));
            buttonLogin.Click();
            Thread.Sleep(200);

            IWebElement buttonEmail = driver.FindElement(By.CssSelector("input[type='email']"));
            buttonEmail.SendKeys("admin@gmail.com");
            Thread.Sleep(200);

            IWebElement buttonPassword = driver.FindElement(By.CssSelector("input[type='password']"));
            buttonPassword.SendKeys("password");
            Thread.Sleep(200);

            IWebElement buttonConfirm = driver.FindElement(By.ClassName("button-block"));
            buttonConfirm.Click();
            Thread.Sleep(7000); //duzi sleep radi ucitavanja stranice

        }

        [TestMethod]
        public void UspjesanLogout()
        {
            IWebElement LogoutButton = driver.FindElement(By.XPath("//button[contains(.,' Log out ')]"));
            LogoutButton.Click();
            Thread.Sleep(500);

            IWebElement YesButton = driver.FindElement(By.XPath("//button[contains(.,'Yes')]"));
            YesButton.Click();
            Thread.Sleep(500);
        }
    }
}