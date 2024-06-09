import { CommitmentDTO } from '../profiles/commitmentDTO';
import { GetPublicWeighInDTO } from './getPublicWeighInDTO';

export type GetWeighInDTO = GetPublicWeighInDTO & {
  id: number;
  weighingDateUTC: Date;
  emotion?: number;
  bucket?: number;
  skippingReason?: number;
  weekNumber: number;
  isEditable: boolean;
  edited: boolean;
  wasAdded: boolean;
  commitment?: CommitmentDTO;
};
