import { FocalPointDTO } from '../dtos/components/focalPointDTO';

export type ImageType = {
  _type: string;
  id: string;
  src: string;
  alt?: string;
  focalPoint: FocalPointDTO | null;
  caption?: string;
};
