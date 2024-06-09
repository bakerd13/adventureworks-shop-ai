import { GetUserEventDTO } from '../events/getUserEventDTO';
import { FeatureAccessInfoDTO } from '../features/featureAccessInfoDTO';
import { GetGoalDTO } from '../goals/getGoalDTO';
import { InteractionByUserDTO } from '../interactions/interactionByUserDTO';
import { PrivateWeighInSituationDTO } from '../weights/privateWeighInSituationDTO';
import { GetWeighInDTO } from '../weights/getWeighInDTO';
import { JourneyDTO } from './journeyDTO';
import { GetWeekDTO } from './getWeekDTO';
import { DayOfWeek } from '../../dateTypes/dayOfWeek';

export type GetPrivateProfileDTO = {
  dateOfBirth?: Date;
  height?: number;
  joinHallOfFame: boolean;
  isPregnant: boolean;
  isBreastfeeding: boolean;
  weighInDay?: DayOfWeek;
  diet?: number; // this is an enum flag on the backend.
  medical?: number; // this is an enum flag on the backend.
  weighIns?: GetWeighInDTO[];
  goals?: GetGoalDTO[];
  likes?: InteractionByUserDTO;
  hugs?: InteractionByUserDTO;
  applauds?: InteractionByUserDTO;
  bookmarks?: InteractionByUserDTO;
  reads?: InteractionByUserDTO;
  week?: GetWeekDTO;
  weighInWeek?: number;
  userEvents?: GetUserEventDTO[];
  currentJourney?: JourneyDTO;
  weighInSituation?: PrivateWeighInSituationDTO;
  featureAccess?: FeatureAccessInfoDTO;
  onExternalScheme: boolean;
  targetWeight?: number;
  initialBMI?: number;
  goalWeightLoss?: number;
  initialWeight?: number;
};
