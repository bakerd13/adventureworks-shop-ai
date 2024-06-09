namespace AdventureWorks.Shop.AI.AppHost.Resources
{
    public class MilvusEtcdServerResource : ContainerResource, IResourceWithEnvironment
    {
        public MilvusEtcdServerResource(string name) : base(name)
        {
        }
    }

    public class MilvusMinioServerResource : ContainerResource, IResourceWithEnvironment
    {
        public MilvusMinioServerResource(string name) : base(name)
        {
        }
    }

    public class MilvusStandaloneServerResource : ContainerResource, IResourceWithEnvironment
    {
        public MilvusStandaloneServerResource(string name) : base(name)
        {
        }
    }

    public class MilvusAttuServerResource : ContainerResource, IResourceWithEnvironment
    {
        public MilvusAttuServerResource(string name) : base(name)
        {
        }
    }
}
