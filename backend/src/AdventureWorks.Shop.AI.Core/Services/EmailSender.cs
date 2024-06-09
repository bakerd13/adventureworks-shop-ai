using AdventureWorks.Shop.AI.Core.Options;
using Microsoft.Extensions.Options;
using System.Net.Mail;

namespace AdventureWorks.Shop.AI.Core.Services
{
    public class EmailSender : IEmailSender
    {
        private readonly SmtpClient _smtpClient;

        public EmailSender(IOptions<EmailOptions> emailOptions)
        {
            _smtpClient = new SmtpClient(emailOptions.Value.Host, emailOptions.Value.Port);
        }

        public Task SendEmail(MailMessage email)
        {
            _smtpClient.Send(email);
            return Task.CompletedTask;
        }
    }
}
