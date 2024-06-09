import { AwardTypeDTO } from '../awards/awardTypeDTO';
import { WeighInAwardTypeDTO } from './WeighInAwardTypeDTO';

export type PrivateWeighInSituationDTO = {
  currentWeight?: number;
  currentWeightLoss?: number;
  isWeighInAllowed: boolean;
  isCurrentWeighInFinished?: boolean;
  nextPossibleWeighInDate: Date;
  dateOfNextWeighInDay: Date;
  nextPossibleAward?: WeighInAwardTypeDTO & AwardTypeDTO;
};
