import { ComponentDTO } from "./componentDTO";
import { FocalPointDTO } from "./focalPointDTO";

export type ImageDTO = ComponentDTO & {
  image?: _ImageDTO;
}

export type _ImageDTO = {
  id: number;
  src?: string;
  alt?: string;
  focalPoint: FocalPointDTO;
  caption?: string;
}
