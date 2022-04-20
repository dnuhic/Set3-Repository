using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System;
using System.Threading;

namespace SeleniumTesting
{
    [TestClass]
    public class AddCashRegisterTest
    {
        static IWebDriver driver;

        [ClassInitialize]
        public static void Inicijalizacija(TestContext context)
        {
            driver = new ChromeDriver();
            string urlstranice = "https://localhost:3000/";
            driver.Navigate().GoToUrl(urlstranice);
            Thread.Sleep(200);
            //Inicijalni login
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
        public void AddCashRegister()
        {
            try
            {
                string addShopUrl = "https://localhost:3000/addCashRegister/";
                driver.Navigate().GoToUrl(addShopUrl);
                Thread.Sleep(500);
                IWebElement addRegisterForma = driver.FindElement(By.XPath("//*[@id='role']/option[2]"));
                addRegisterForma.Click();
                Thread.Sleep(200);
                IWebElement addRegisterForma2 = driver.FindElement(By.Id("nazivKase"));
                addRegisterForma2.SendKeys("KasaTest");
                Thread.Sleep(200);
                IWebElement addRegisterForma3 = driver.FindElement(By.Id("opis"));
                addRegisterForma3.SendKeys("OpisTest");
                Thread.Sleep(200);
                IWebElement addRegisterConfirm= driver.FindElement(By.XPath("//button[contains(.,'Add')]"));
                addRegisterConfirm.Click();
                Thread.Sleep(200);
            }
            catch (Exception e)
            {
                Assert.AreEqual(e.Message, "Action completed!");
            }

        }
    }
}