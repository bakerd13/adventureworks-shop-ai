export type GetUserEventDTO = {
  userEventType: UserEventType;
  createdDateUTC: Date;
}

export enum UserEventType {
  ReceivedOptInHallOfFameNotification = 2,
  HomepageMigrationOnboarderCompleted = 3,
  PlannerMigrationOnboarderCompleted = 4,
  CommunityMigrationOnboarderCompleted = 5,
  EssentialsMigrationOnboarderCompleted = 6,
  HomepageMigrationOnboarderCancelled = 7,
  ClosedCommunityGroupsPopup = 8,
  AutoEnrolledIntoCommunityGroups = 9,
  CompletedWebOnboarder = 12,
  DismissedWebOnboarder = 13,
  CompletedAppOnboarder = 14,
  DismissedAppOnboarder = 15,
  ClosedFollowingIntro = 16,
  ClosedPlannerVideoSearchIntro = 17,
  CompletedS2SFoodOptimising = 18,
  ForcedToStartS2SFoodOptimising = 19,
}