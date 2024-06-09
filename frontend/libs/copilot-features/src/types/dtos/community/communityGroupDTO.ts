import { CommunityGroupCategoryDTO } from "./communityGroupCategoryDTO";

export type CommunityGroupDTO = {
  id: number;
  name: string;
  description?: string;
  icon: string;
  slug: string;
  membersCount: number;
  hasJoined: boolean;
  createdDateUTC: Date;
  communityGroupCategory: CommunityGroupCategoryDTO;
}