export type FeatureAccessInfoDTO = {
  communityForum: boolean;
  virtualConsultant: boolean;
  hallOfFame: boolean;
  gettingStartedEmail: boolean;
  weightLossAwards: boolean;
  bodyMagicAwards: boolean;
  weighIn: string;
  weighInValidation: boolean;
  transferToGroup: number;
  transferToOnline: number;
  plannerAccess: boolean;
  sp: boolean;
  synsAllowance: number;
  otherSynsAllowance: number;
  healthyExtraChoices?: HealthyExtraChoice[];
}

type HealthyExtraChoice = {
  a: number;
  b: number;
}