
using AdventureWorks.Shop.AI.Core.Attributes;
using System.ComponentModel.DataAnnotations;

namespace AdventureWorks.Shop.AI.Core.Options
{
    public sealed class EmailOptions
    {
        public const string PropertyName = "Email";

        /// <summary>
        /// Host name of email service.
        /// </summary>
        [Required]
        public string Host { get; set; } = "localhost";

        /// <summary>
        /// Host name of email service.
        /// </summary>
        [Required]
        public int Port { get; set; }
    }
}
