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
                string editUserUrl = "https://localhost:3000/editcashRegister/2";
                driver.Navigate().GoToUrl(editUserUrl);
                Thread.Sleep(500);
                IWebElement editRegisterForma = driver.FindElement(By.XPath("/html/body/div/div/form/div[2]/select/option[1]"));
                editRegisterForma.Click();
                Thread.Sleep(200);
                IWebElement editRegisterForma2 = driver.FindElement(By.XPath("//input[contains(@id,'cashRegisterName')]"));
                editRegisterForma2.Clear();
                editRegisterForma2.SendKeys("KasaTestPromjena");
                Thread.Sleep(200);
                IWebElement editRegisterForma3 = driver.FindElement(By.XPath("//textarea[contains(@id,'cashRegisterDescription')]"));
                editRegisterForma3.Clear();
                editRegisterForma3.SendKeys("OpisTestPromjena");
                Thread.Sleep(200);
                IWebElement editRegisterConfirm = driver.FindElement(By.XPath("//button[contains(.,'Edit')]"));
                editRegisterConfirm.Click();
                Thread.Sleep(200);
            }
            catch (Exception e)
            {
                Assert.AreEqual(e.Message, "Changes have been saved succesfully!");
            }

        }
    }
}