export type ReportDTO = {
  userId: number;
  userName?: string;
  createdDateUTC: Date;
  reportReason: PostReportReason;
}

enum PostReportReason {
  None = 0,
  Other = 1,
  IncorrectInformation = 2,
  Offensive = 3,
  Harrasment = 4,
  SupportRequired = 5,
  SelfPromotion = 6,
}