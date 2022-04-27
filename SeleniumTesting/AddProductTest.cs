using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System;
using System.Threading;

namespace SeleniumTesting
{
    [TestClass]
    public class AddProductTest
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
        public void AddProduct()
        {
            try
            {
                string addProductUrl = "https://localhost:3000/addProduct/";
                driver.Navigate().GoToUrl(addProductUrl);
                Thread.Sleep(500);
                IWebElement addProductForma = driver.FindElement(By.XPath("//input[contains(@id,'name')]"));
                addProductForma.SendKeys("ProizvodTest");
                Thread.Sleep(200);
                IWebElement addProductForma2 = driver.FindElement(By.XPath("//*[@id='categories']/option[2]"));
                addProductForma2.Click();
                Thread.Sleep(200);
                IWebElement addProductForma3 = driver.FindElement(By.XPath("//*[@id='measuringUnits']/option[2]"));
                addProductForma3.Click();
                Thread.Sleep(200);
                IWebElement addProductConfirm = driver.FindElement(By.XPath("//button[contains(.,'Add product')]"));
                addProductConfirm.SendKeys(Keys.Enter);
                Thread.Sleep(200);
            }
            catch (Exception e)
            {
                Assert.AreEqual(e.Message, "Action completed!");
            }

        }
    }
}