using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System;
using System.Threading;

namespace SeleniumTesting
{
    [TestClass]
    public class FailedLoginTest
    {
        static IWebDriver driver;

        [ClassInitialize]
        public static void Inicijalizacija(TestContext context)
        {
            driver = new ChromeDriver();
            string urlstranice = "https://localhost:3000/";
            driver.Navigate().GoToUrl(urlstranice);
            Thread.Sleep(200);
        }


        [TestMethod]
        public void NeuspjesanLogin()
        {
            try
            {
                IWebElement buttonLogin = driver.FindElement(By.ClassName("navbar-nav"));
                buttonLogin.Click();
                Thread.Sleep(200);

                IWebElement buttonEmail = driver.FindElement(By.CssSelector("input[type='email']"));
                buttonEmail.SendKeys("testadmin@gmail.com");
                Thread.Sleep(200);

                IWebElement buttonPassword = driver.FindElement(By.CssSelector("input[type='password']"));
                buttonPassword.SendKeys("pogresanpassword");
                Thread.Sleep(200);

                IWebElement buttonConfirm = driver.FindElement(By.ClassName("button-block"));
                buttonConfirm.Click();
                Thread.Sleep(200);

            }
            catch (Exception e)
            {
                Assert.AreEqual(e.Message, "Wrong log in information");
            }
        }

    }
}