export type JourneyDTO = {
  id: number;
  profileId: number;
  startDateUTC: Date;
  createdDateUTC: Date;
  startWeight: number;
  currentWeight: number;
  targetWeight?: number;
  endDateUTC?: number;
  startDetailsConfirmed: boolean;
}