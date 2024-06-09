export type GetGoalDTO = {
  id: number;
  text?: string;
  achieved?: boolean;
  createdDateUTC?: Date;
  achievedDateUTC?: Date;
}