using System.Collections.Concurrent;
using System.Reflection;
using System.Text;

namespace AdventureWorks.Shop.AI.Core.Resources
{
    public static class CachedEmbeddedResourceHelper
    {
        private static ConcurrentDictionary<string, string> ResourceDictionary = new ConcurrentDictionary<string, string>();

        public static string GetResourceContent(Assembly assembly, string key)
        {
            return ResourceDictionary.GetOrAdd(key, (k) => new Lazy<string>(() => ReadManifestStream(assembly, k)).Value);
        }

        private static string ReadManifestStream(Assembly assembly, string key)
        {
            var resourceStream = assembly.GetManifestResourceStream(key);
            if (resourceStream == null)
            {
                throw new ArgumentNullException(nameof(resourceStream), "Resource stream is null. Resources need to have a build action of Embedded Resource");
            }
            using (var reader = new StreamReader(resourceStream, Encoding.UTF8))
            {
                return reader.ReadToEnd();
            }
        }
    }
}
