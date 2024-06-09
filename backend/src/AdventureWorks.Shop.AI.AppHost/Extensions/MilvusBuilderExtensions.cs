using Aspire.Hosting;
using AdventureWorks.Shop.AI.AppHost.Resources;
using System.Net;
using System.Net.NetworkInformation;
using System.Net.Sockets;

namespace AdventureWorks.Shop.AI.AppHost.Extensions
{
    public static class MilvusBuilderExtensions
    {
        public static IResourceBuilder<MilvusEtcdServerResource> AddMilvusEtcd(this IDistributedApplicationBuilder builder,
            string name,
            string volume)
        {
            var milvusEtcd = new MilvusEtcdServerResource(name);
            var milvusetcd = builder.AddResource(milvusEtcd)
                                  .WithImage(MilvusContainerImageTags.ImageEtcd)
                                  .WithImageRegistry(MilvusContainerImageTags.Registry)
                                  .WithBindMount(volume, "/etcd")
                                  .WithContainerRuntimeArgs(["etcd", "-advertise-client-urls=http://127.0.0.1:2379", "-listen-client-urls http://0.0.0.0:2379", "--data-dir /etcd"])
                                  .WithEnvironment(context =>
                                  {
                                      context.EnvironmentVariables["ETCD_AUTO_COMPACTION_MODE"] = "revision";
                                      context.EnvironmentVariables["ETCD_AUTO_COMPACTION_RETENTION"] = 1000;
                                      context.EnvironmentVariables["ETCD_QUOTA_BACKEND_BYTES"] = 4294967296;
                                      context.EnvironmentVariables["ETCD_SNAPSHOT_COUNT"] = 50000;
                                  });

            return milvusetcd;
        }

        public static IResourceBuilder<ContainerResource> AddMilvusMinio(this IDistributedApplicationBuilder builder,
            string name,
            string volume)
        {
            var milvusminio = builder.AddContainer(name, MilvusContainerImageTags.ImageMinio)
                                  .WithBindMount(volume, "/minio_data")
                                  .WithContainerRuntimeArgs(["minio", "server", "/minio_data"])
                                  .WithEnvironment(context =>
                                  {
                                      context.EnvironmentVariables["MINIO_ACCESS_KEY"] = "minioadmin";
                                      context.EnvironmentVariables["MINIO_SECRET_KEY"] = "minioadmin";
                                  });

            return milvusminio;
        }

        public static IResourceBuilder<ContainerResource> AddMilvusStandalone(this IDistributedApplicationBuilder builder,
            string name,
            string volume)
        {
            var milvusstandalone = builder
                                  .AddContainer(name, MilvusContainerImageTags.ImageStandalone)
                                  .WithBindMount(volume, "/var/lib/milvus")
                                  .WithContainerRuntimeArgs(["milvus", "run", "standalone"])
                                  .WithEnvironment(context =>
                                  {
                                      context.EnvironmentVariables["ETCD_ENDPOINTS"] = "etcd:2379";
                                      context.EnvironmentVariables["MINIO_ADDRESS"] = "minio:9000";
                                  });

            return milvusstandalone;
        }

        public static IResourceBuilder<MilvusAttuServerResource> AddMilvusAttu(this IDistributedApplicationBuilder builder,
            string name,
            int port)
        {
            IPHostEntry hostInfo = Dns.GetHostEntry(Dns.GetHostName());
            var addresses = hostInfo.AddressList.AsEnumerable();
            var ipAddress = addresses.Where(ip => ip.AddressFamily == AddressFamily.InterNetwork).FirstOrDefault();

            foreach (NetworkInterface item in NetworkInterface.GetAllNetworkInterfaces())
            {
                if (item.Name.ToLower().Contains("default") && item.OperationalStatus == OperationalStatus.Up)
                {
                    foreach (UnicastIPAddressInformation ip in item.GetIPProperties().UnicastAddresses)
                    {
                        if (ip.Address.AddressFamily == AddressFamily.InterNetwork)
                        {
                            ipAddress = ip.Address;
                        }
                    }
                }
            }

            var useIP = ipAddress is null ? "127.0.0.1" : ipAddress.ToString();

            var milvusAttu = new MilvusAttuServerResource(name);
            var milvusattu = builder.AddResource(milvusAttu)
                                  .WithImage(MilvusContainerImageTags.ImageAttu)
                                  .WithHttpEndpoint(port: port, targetPort: 3000)
                                  .WithEnvironment(context =>
                                  {
                                      context.EnvironmentVariables["MILVUS_URL"] = $"{useIP}:19530";
                                      context.EnvironmentVariables["HOST_URL"] = $"http://{useIP}:8085";
                                  });

            return milvusattu;
        }
    }
}
