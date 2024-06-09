import { ImageDTO } from "../../images/imageDTO";
import { TileDTO } from "../components/tileDTO";

export type FeatureTileDTO = TileDTO & {
  image?: ImageDTO;
  palette?: string;
  slug?: string;
}