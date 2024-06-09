import { GetWeighInDTO } from './getWeighInDTO';

export type GetWeightLossWeighInDTO = GetWeighInDTO & {
  weightLoss?: number;
  achievedTarget: boolean;
};
