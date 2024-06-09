/**
 * Reusable object to use in `propTypes` for a `weightLossAward` prop.
 * @type {Object}
 */
export type WeightLossAwardDTO = {
  id: number;
  title?: string;
  weightLoss: number;
  unitOfMeasure: number;
  retiredDateUTC: Date;
  createdDateUTC: Date;
  awardTypeCategory?: string;
};

export type WeightLossAwardType = WeightLossAwardDTO;