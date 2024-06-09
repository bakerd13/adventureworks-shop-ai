using System.Net.Mail;

namespace AdventureWorks.Shop.AI.Core.Services
{
    public interface IEmailSender
    {
        Task SendEmail(MailMessage email);
    }
}
