using System.Reflection;

namespace AdventureWorks.Shop.AI.Core.Resources
{
    public abstract class EmbeddedResource
    {
        private readonly Assembly _assembly;

        private readonly string _namespace;

        private readonly string _extension;

        protected EmbeddedResource(string extension)
        {
            _assembly = GetType().Assembly;
            _namespace = GetType().Namespace!;
            _extension = extension;
        }

        protected string GetResourceContent(string resourceName)
        {
            var fullResourceName = string.IsNullOrEmpty(_extension) ? $"{_namespace}.{resourceName}" : $"{_namespace}.{resourceName}.{_extension}";
            return CachedEmbeddedResourceHelper.GetResourceContent(_assembly, fullResourceName);
        }
    }
}
