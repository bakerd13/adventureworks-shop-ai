import { GetAwardDTO } from '../awards/getAwardDTO';
import { GetPublicWeighInDTO } from '../weights/getPublicWeighInDTO';
import { PublicWeighInSituationDTO } from '../weights/publicWeighInSituationDTO';
import { CommitmentDTO } from './commitmentDTO';
import { GetBaseProfileDTO } from './getBaseProfileDTO';

export type GetPublicProfileDTO = GetBaseProfileDTO & {
  targetWeight?: number;
  initialBMI?: number;
  createdDateUTC?: Date;
  goalWeightLoss?: number;
  biography: string;
  initialWeight?: number;
  coverPhotoId?: number;
  commitments?: CommitmentDTO[];
  weighIns?: GetPublicWeighInDTO[];
  awards?: GetAwardDTO[];
  weighInSituation?: PublicWeighInSituationDTO;
  isFollowing: boolean;
};
