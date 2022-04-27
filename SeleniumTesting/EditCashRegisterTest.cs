using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System;
using System.Threading;

namespace SeleniumTesting
{
    [TestClass]
    public class EditCashRegisterTest
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
        public void EditCashRegister()
        {
            try
            {
                string editShopsUrl = "https://localhost:3000/shops";
                driver.Navigate().GoToUrl(editShopsUrl);
                Thread.Sleep(500);
                IWebElement infoDugme = driver.FindElement(By.XPath("//span[contains(.,'ProdavnicaTest')]//parent::div//following-sibling::div//button[3]"));
                infoDugme.Click();
                Thread.Sleep(1000);
                IWebElement editDugme = driver.FindElement(By.XPath("//span[contains(.,'DeskripcijaTest')]//parent::div//following-sibling::div//button[1]"));
                editDugme.Click();
                Thread.Sleep(1000);
                IWebElement editRegisterForma = driver.FindElement(By.XPath("//input[contains(@id,'cashRegisterName')]"));
                editRegisterForma.Clear();
                editRegisterForma.SendKeys("KasaTestPromjena");
                Thread.Sleep(200);
                IWebElement editRegisterForma2 = driver.FindElement(By.XPath("//textarea[contains(@id,'cashRegisterDescription')]"));
                editRegisterForma2.Clear();
                editRegisterForma2.SendKeys("DeskripcijaTestPromjena");
                Thread.Sleep(200);
                IWebElement editRegisterForma3 = driver.FindElement(By.XPath("//button[contains(.,'Edit')]"));
                editRegisterForma3.Click();
                Thread.Sleep(1000);
            }
            catch (Exception e)
            {
                Assert.AreEqual(e.Message, "Changes have been saved succesfully!");
            }

        }
    }
}