import { ImageDTO } from "../../images/imageDTO";
import { TileDTO } from "../components/tileDTO";

export type RecipeTileDTO = TileDTO & {
  image?: ImageDTO;
  characteristics: number;
  palette?: string;
  servings: number;
  servingType?: string;
  syns: number;
  totalTime: number;
  isFoodRange: boolean;
  foodRangeCategoryId: number;
  recipeDbId: number;
  introduction?: string;
}