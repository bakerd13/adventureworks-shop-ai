import { UserKindDTO } from "./userKindDTO";

export type AuthorDTO = {
  id: number;
  userName?: string;
  avatar?: string;
  kind?: UserKindDTO;
  memberSince?: Date;
}