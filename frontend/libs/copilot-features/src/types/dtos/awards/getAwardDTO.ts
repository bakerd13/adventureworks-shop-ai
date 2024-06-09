import { AwardTypeDTO } from './awardTypeDTO';

export type GetAwardDTO = {
  id: number;
  type?: AwardTypeDTO;
  achievedDateUTC: Date;
  dateRepresentedStart?: Date;
  dateRepresentedEnd?: Date;
};
