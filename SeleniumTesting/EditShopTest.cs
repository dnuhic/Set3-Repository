using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System;
using System.Threading;

namespace SeleniumTesting
{
    [TestClass]
    public class EditShopTest
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
        public void EditShop()
        {
            try
            {
                string editUserUrl = "https://localhost:3000/editshop/3";
                driver.Navigate().GoToUrl(editUserUrl);
                Thread.Sleep(500);
                IWebElement editShopForma = driver.FindElement(By.XPath("//input[contains(@id,'name')]"));
                editShopForma.Clear();
                editShopForma.SendKeys("ProdavnicaTestPromjena");
                Thread.Sleep(200);
                IWebElement editShopForma2 = driver.FindElement(By.XPath("//input[contains(@id,'address')]"));
                editShopForma2.Clear();
                editShopForma2.SendKeys("AdresaTestPromjena");
                Thread.Sleep(200);
                IWebElement editShopForma3 = driver.FindElement(By.XPath("//button[contains(.,'Edit')]"));
                editShopForma3.Click();
                Thread.Sleep(200);
            }
            catch (Exception e)
            {
                Assert.AreEqual(e.Message, "Changes have been saved succesfully!");
            }

        }
    }
}