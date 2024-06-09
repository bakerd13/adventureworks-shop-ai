import { ImageDTO } from "../../images/imageDTO";
import { ButtonTileDTO } from "./buttonTileDTO";

export type ButtonThumbnailTileDTO = ButtonTileDTO & {
  thumbnail?: ImageDTO;
  palette?: string;
}