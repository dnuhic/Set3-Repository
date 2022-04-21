using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System;
using System.Threading;

namespace SeleniumTesting
{
    [TestClass]
    public class AddShopTest
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
        public void AddShop()
        {
            try
            {
                string addShopUrl = "https://localhost:3000/addShop/";
                driver.Navigate().GoToUrl(addShopUrl);
                Thread.Sleep(500);
                IWebElement addShopForma = driver.FindElement(By.XPath("//input[contains(@id,'ime')]"));
                addShopForma.SendKeys("ProdavnicaTest");
                Thread.Sleep(200);
                IWebElement addShopForma2 = driver.FindElement(By.Id("adresa"));
                addShopForma2.SendKeys("AdresaTest");
                Thread.Sleep(200);
                IWebElement addShopConfirm = driver.FindElement(By.XPath("//button[contains(.,'Add')]"));
                addShopConfirm.Click();
                Thread.Sleep(500);
                string addShopUrl2 = "https://localhost:3000/addShop/";
                driver.Navigate().GoToUrl(addShopUrl2);
                Thread.Sleep(500);
                IWebElement addShopForma21 = driver.FindElement(By.XPath("//input[contains(@id,'ime')]"));
                addShopForma21.SendKeys("ProdavnicaTest2");
                Thread.Sleep(200);
                IWebElement addShopForma22 = driver.FindElement(By.Id("adresa"));
                addShopForma22.SendKeys("AdresaTest2");
                Thread.Sleep(200);
                IWebElement addShopConfirm2 = driver.FindElement(By.XPath("//button[contains(.,'Add')]"));
                addShopConfirm.Click();
            }
            catch (Exception e)
            {
                Assert.AreEqual(e.Message, "Shop was succesfully added!");
            }

        }
    }
}