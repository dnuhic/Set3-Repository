using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System;
using System.Threading;

namespace SeleniumTesting
{
    [TestClass]
    public class EditUserTest
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
                string editUserUrl = "https://localhost:3000/users/4";
                driver.Navigate().GoToUrl(editUserUrl);
                Thread.Sleep(500);
                IWebElement editUserForma = driver.FindElement(By.XPath("//input[contains(@id,'firstName')]"));
                editUserForma.Clear();
                editUserForma.SendKeys("Test");
                Thread.Sleep(200);
                IWebElement editUserForma2 = driver.FindElement(By.XPath("//input[contains(@id,'lastName')]"));
                editUserForma2.Clear();
                editUserForma2.SendKeys("Admin");
                Thread.Sleep(200);
                IWebElement editUserForma3 = driver.FindElement(By.XPath("//button[contains(.,'Edit')]"));
                editUserForma3.Click();
                Thread.Sleep(200);
            }
            catch (Exception e)
            {
                Assert.AreEqual(e.Message, "Changes have been saved succesfully!");
            }

        }
    }
}