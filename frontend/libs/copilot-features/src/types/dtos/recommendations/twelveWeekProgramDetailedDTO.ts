import { ImageDTO } from "../components/imageDTO";
import { ListItemDTO } from "../components/listItemDTO";
import { TileDTO } from "../components/tileDTO";
import { TwelveWeekProgramDTO } from "./twelveWeekProgramDTO";

export type TwelveWeekProgramDetailedDTO = TwelveWeekProgramDTO & {
  isVisibleOnList: boolean;
  backgroundImage?: ImageDTO;
  articles?: TileDTO[];
  goals?: ListItemDTO[];
}