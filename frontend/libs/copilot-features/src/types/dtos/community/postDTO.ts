import { AuthorDTO } from "./authorDTO";
import { CommunityGroupDTO } from "./communityGroupDTO";
import { DeletionInfoDTO } from "./deletionInfoDTO";
import { DismissionInfoDTO } from "./dismissionInfoDTO";
import { MediaDTO } from "./mediaDTO";
import { MentionUserDTO } from "./mentionUserDTO";
import { ReportDTO } from "./reportDTO";

export type PostDTO = {
  _type: string;
  id: number;
  author?: AuthorDTO;
  title?: string;
  text?: string;
  createdDate: Date;
  latestActivityDate?: Date;
  tags?: number[];
  likesCount?: number;
  commentsCount?: number;
  reports?: ReportDTO[];
  media?: MediaDTO;
  isPinned: boolean;
  updatedDate?: Date;
  deletionInfo?: DeletionInfoDTO;
  dismissionInfo?: DismissionInfoDTO;
  isReportedByCurrentUser: boolean;
  mentions?: MentionUserDTO;
  communityGroup?: CommunityGroupDTO;
  isCommunityGroupPinned: boolean;
  isBlockedByCurrentUser: boolean;
}