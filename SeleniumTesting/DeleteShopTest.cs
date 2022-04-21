using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System;
using System.Threading;

namespace SeleniumTesting
{
    [TestClass]
    public class DeleteShopTest
    {
        static IWebDriver driver;

        [ClassInitialize]
        public static void Inicijalizacija(TestContext context)
        {
            driver = new ChromeDriver();
            string urlstranice = "https://localhost:3000/";
            driver.Navigate().GoToUrl(urlstranice);
            Thread.Sleep(200);
            IWebElement buttonLogin = driver.FindElement(By.XPath("//button[contains(.,'Log in')]"));
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
            Thread.Sleep(2000); //duzi sleep radi ucitavanja stranice
        }

        [TestMethod]
        public void DeleteShop()
        {
            try
            {
                string usersUrl = "https://localhost:3000/shops/";
                driver.Navigate().GoToUrl(usersUrl);
                Thread.Sleep(500);
                IWebElement deleteDugme = driver.FindElement(By.XPath("//span[contains(.,'ProdavnicaTestPromjena')]//parent::div//following-sibling::div//button[2]"));
                deleteDugme.Click();
                Thread.Sleep(500);
            }
            catch (Exception e)
            {
                Assert.AreEqual(e.Message, "Action completed!");
            }

        }
    }
}