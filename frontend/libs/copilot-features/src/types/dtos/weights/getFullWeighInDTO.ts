import { GetAwardDTO } from '../awards/getAwardDTO';
import { GetGoalDTO } from '../goals/getGoalDTO';
import { CommitmentDTO } from '../profiles/commitmentDTO';
import { GetWeightLossWeighInDTO } from './getWeightLossWeighInDTO';

export type GetFullWeighInDTO = GetWeightLossWeighInDTO & {
  profileId: number;
  awards: GetAwardDTO[];
  commitment?: CommitmentDTO;
  goals?: GetGoalDTO[];
  isFinished: boolean;
};
