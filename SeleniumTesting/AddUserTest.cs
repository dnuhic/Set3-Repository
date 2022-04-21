using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System;
using System.Threading;

namespace SeleniumTesting
{
    [TestClass]
    public class AddUserTest
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
        public void AddUser()
        {
            try
            {
                string addUserurl = "https://localhost:3000/addNewUser/";
                driver.Navigate().GoToUrl(addUserurl);
                Thread.Sleep(500);
                IWebElement addUserForma = driver.FindElement(By.XPath("//input[contains(@id,'ime')]"));
                addUserForma.SendKeys("Test");
                Thread.Sleep(200);
                IWebElement addUserForma2 = driver.FindElement(By.Id("prezime"));
                addUserForma2.SendKeys("Admin2");
                Thread.Sleep(200);
                IWebElement addUserForma3 = driver.FindElement(By.Id("e-mail"));
                addUserForma3.SendKeys("testadmin2@gmail.com");
                Thread.Sleep(200);
                IWebElement addUserForma4 = driver.FindElement(By.Id("password"));
                addUserForma4.SendKeys("12345678");
                Thread.Sleep(200);
                IWebElement addUserForma5 = driver.FindElement(By.Id("answer"));
                addUserForma5.SendKeys("dog");
                Thread.Sleep(200);
                addUserForma5.SendKeys(Keys.Tab);
                Thread.Sleep(200);
                addUserForma5.SendKeys(Keys.Enter);
                Thread.Sleep(1000);
            }
            catch (Exception e)
            {
                Assert.AreEqual(e.Message, "Action completed!");
            }
              
        }
    }
}