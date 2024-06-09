export type InteractionByUserDTO = {
  id: number;
  subjectKind: RelatedEntityKind;
}

enum RelatedEntityKind {
  Recipe,
  Feature,
  SuccessStory,
  Comment,
  Post,
  ActivityType,
  Favourite,
  SevenDayMenu,
  FoodList,
  ActivityVideo,
}