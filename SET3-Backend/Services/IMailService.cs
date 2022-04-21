//using MailKit.Net.Smtp;

//using MailKit.Security;

using Microsoft.Extensions.Options;
using MimeKit;
using SET3_Backend.Models;
using SET3_Backend.Settings;
using System.Security.Cryptography;
using System.Text;
using System.Net;
using System.Net.Mail;

namespace SET3_Backend.Services
{
    
    public interface IMailService
    {
        Task SendEmailAsync(MailRequest mailRequest);
        Task SendEmailCODEAsync(MailRequest mailRequest, String sixDigit);
    
    }
    public class MailService : IMailService
    {
        private readonly MailSettings _mailSettings;
        public MailService(IOptions<MailSettings> mailSettings)
        {
            _mailSettings = mailSettings.Value;
        }

        /*public async Task SendEmailAsync(MailRequest mailRequest)
        {
            var hashedUrl = hashMail(mailRequest.ToEmail);
            string FilePath = Directory.GetCurrentDirectory() + "\\Templates\\passforgot.html";
            StreamReader str = new StreamReader(FilePath);
            string MailText = str.ReadToEnd();
            str.Close();
            MailText = MailText.Replace("[name]", mailRequest.ToEmail);
            MailText = MailText.Replace("[link]", "https://localhost:3000/forgotpasswordconfirm/" + hashedUrl);
            var email = new MimeMessage();
            email.Sender = MailboxAddress.Parse(_mailSettings.Mail);
            email.To.Add(MailboxAddress.Parse(mailRequest.ToEmail));
            email.Subject = $"Password recovery";
            var builder = new BodyBuilder();

            builder.HtmlBody = MailText;

            email.Body = builder.ToMessageBody();
            using var smtp = new SmtpClient();
            smtp.Connect(_mailSettings.Host, _mailSettings.Port, SecureSocketOptions.StartTls);
            smtp.Authenticate(_mailSettings.Mail, _mailSettings.Password);
            await smtp.SendAsync(email);
            smtp.Disconnect(true);
        }*/

        public async Task SendEmailAsync(MailRequest mailRequest) {
            var hashedUrl = hashMail(mailRequest.ToEmail);
            MailMessage Message = new MailMessage(_mailSettings.Mail, mailRequest.ToEmail);
            Message.Subject = "Mail recovery";

            string url = "https://set3front.azurewebsites.net/forgotpasswordconfirm/" + hashedUrl;

            Message.Body = "\nRecovery mail link: " + url;

            SmtpClient SmtpClient = new SmtpClient(_mailSettings.Host);

            SmtpClient.EnableSsl = true;

            NetworkCredential credential = new NetworkCredential(_mailSettings.Mail, _mailSettings.Password);
            SmtpClient.UseDefaultCredentials = false;
            SmtpClient.Credentials = credential;
            SmtpClient.Port = 587;
            SmtpClient.Send(Message);
        }

        public async Task SendEmailCODEAsync(MailRequest mailRequest, String sixDigit)
        {
            var hashedUrl = hashMail(mailRequest.ToEmail);
            MailMessage Message = new MailMessage(_mailSettings.Mail, mailRequest.ToEmail);
            Message.Subject = "Code verify";

            string url = "https://set3front.azurewebsites.net/forgotpasswordconfirm/" + hashedUrl;

            Message.Body = "\nThis is your code:" + sixDigit;

            SmtpClient SmtpClient = new SmtpClient(_mailSettings.Host);

            SmtpClient.EnableSsl = true;

            NetworkCredential credential = new NetworkCredential(_mailSettings.Mail, _mailSettings.Password);
            SmtpClient.UseDefaultCredentials = false;
            SmtpClient.Credentials = credential;
            SmtpClient.Port = 587;
            SmtpClient.Send(Message);
        }

        /*public async Task SendEmailCODEAsync(MailRequest mailRequest, String sixDigit)
        {
            var hashedUrl = hashMail(mailRequest.ToEmail);
            string FilePath = Directory.GetCurrentDirectory() + "\\Templates\\authcode.html";
            StreamReader str = new StreamReader(FilePath);
            string MailText = str.ReadToEnd();
            str.Close();

            MailText = MailText.Replace("[name]", mailRequest.ToEmail);
            MailText = MailText.Replace("[code]", sixDigit);
            var email = new MimeMessage();
            email.Sender = MailboxAddress.Parse(_mailSettings.Mail);
            email.To.Add(MailboxAddress.Parse(mailRequest.ToEmail));
            email.Subject = $"Code Verify";
            var builder = new BodyBuilder();

            builder.HtmlBody = MailText;

            email.Body = builder.ToMessageBody();
            using var smtp = new SmtpClient();
            smtp.Connect(_mailSettings.Host, _mailSettings.Port, SecureSocketOptions.StartTls);
            smtp.Authenticate(_mailSettings.Mail, _mailSettings.Password);
            await smtp.SendAsync(email);
            smtp.Disconnect(true);
        }*/

        private string hashMail(string mail) {
            return EnryptString(mail);
        }

        public string DecryptString(string encrString)
        {
            byte[] b;
            string decrypted;
            try
            {
                b = Convert.FromBase64String(encrString);
                decrypted = System.Text.ASCIIEncoding.ASCII.GetString(b);
            }
            catch (FormatException fe)
            {
                decrypted = "";
            }
            return decrypted;
        }

        public string EnryptString(string strEncrypted)
        {
            byte[] b = System.Text.ASCIIEncoding.ASCII.GetBytes(strEncrypted);
            string encrypted = Convert.ToBase64String(b);
            return encrypted;
        }
    }
}
