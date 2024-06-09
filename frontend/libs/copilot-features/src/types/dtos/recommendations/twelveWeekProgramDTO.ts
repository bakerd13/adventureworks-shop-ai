import { IdBaseDTO } from "../baseDtos/idBaseDTO";

export type TwelveWeekProgramDTO = IdBaseDTO & {
  title?: string;
  label?: string;
  description?: string;
  slug?: string;
}