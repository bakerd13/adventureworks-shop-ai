namespace AdventureWorks.Shop.AI.Milvus.Constants
{
  public static class Collections
  {
    public const string ROUTES_COLLECTION_NAME = "routes";
    public const string RECIPE_SEARCH_COLLECTION_NAME = "recipe_search";
  }

  public static class RoutesTable
  {
    public const string IdField = "route_id";
    public const string RouteField = "route";
    public const string SearchField = "route_vector";
  }

  public static class RecipesTable
  {
    public const string IdField = "recipe_id";
    public const string RecipeRawField = "recipe_raw";
    public const string RecipeContentField = "recipe_content";
    public const string SearchField = "recipe_vector";
  }
}
