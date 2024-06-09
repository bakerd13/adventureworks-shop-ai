import { TypeBaseDTO } from "../baseDtos/typeBaseDTO";

export type TileDTO = TypeBaseDTO & {
  id: string;
  link?: string;
  title?: string;
}