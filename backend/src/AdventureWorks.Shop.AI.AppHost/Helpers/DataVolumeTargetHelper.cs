using System.IO;

namespace AdventureWorks.Shop.AI.AppHost.Helpers
{
    internal static class DataVolumeTargetHelper
    {
        public static string GetVolumeTarget()
        {
            // Get the current directory (project directory)
            string projectDirectory = Directory.GetCurrentDirectory();

            // Safely go up two directories from the project directory
            DirectoryInfo? parentDirectory = Directory.GetParent(projectDirectory);

            // Check if the first parent is not null
            if (parentDirectory != null)
            {
                DirectoryInfo? grandParentDirectory = Directory.GetParent(parentDirectory.FullName);

                // Check if the second parent (grandparent) is not null
                if (grandParentDirectory != null)
                {
                    string targetDirectory = grandParentDirectory.FullName;
                    return targetDirectory;
                }
                else
                {
                    // Handle the case where the project directory is at a level where it only has one parent
                    DirectoryInfo? targetDirectory = Directory.GetParent(projectDirectory);
                    return targetDirectory?.FullName ?? projectDirectory;
                }
            }
            else
            {
                // Handle the case where the project directory is at the root level with no parents
                return projectDirectory;
            }
        }

        /// <summary>
        /// Creates a volume name with the form <c>$"{applicationName}-{resourceName}-{suffix}</c>, e.g. <c>"myapplication-postgres-data"</c>.
        /// </summary>
        /// <remarks>
        /// If the application name contains chars that are invalid for a volume name, the prefix <c>"volume-"</c> will be used instead.
        /// </remarks>
        public static string CreateVolumeName<T>(IResourceBuilder<T> builder, string suffix) where T : IResource
        {
            if (!HasOnlyValidChars(suffix))
            {
                throw new ArgumentException($"The suffix '{suffix}' contains invalid characters. Only [a-zA-Z0-9_.-] are allowed.", nameof(suffix));
            }

            // Create volume name like "myapplication-postgres-data"
            var applicationName = builder.ApplicationBuilder.Environment.ApplicationName;
            var resourceName = builder.Resource.Name;
            return $"{(HasOnlyValidChars(applicationName) ? applicationName : "volume")}-{resourceName}-{suffix}";
        }

        private static bool HasOnlyValidChars(string name)
        {
            // According to the error message from docker CLI, volume names must be of form "[a-zA-Z0-9][a-zA-Z0-9_.-]"
            var nameSpan = name.AsSpan();

            for (var i = 0; i < nameSpan.Length; i++)
            {
                var c = nameSpan[i];

                if (i == 0 && !(Char.IsAsciiLetter(c) || Char.IsNumber(c)))
                {
                    // First char must be a letter or number
                    return false;
                }
                else if (!(Char.IsAsciiLetter(c) || Char.IsNumber(c) || c == '_' || c == '.' || c == '-'))
                {
                    // Subsequent chars must be a letter, number, underscore, period, or hyphen
                    return false;
                }
            }

            return true;
        }
    }
}
