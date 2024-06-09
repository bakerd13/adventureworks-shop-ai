import { GetFullWeighInDTO } from "../weights/getFullWeighInDTO";
import { GetPrivateProfileDTO } from "./getPrivateProfileDTO";
import { GetPublicProfileDTO } from "./getPublicProfileDTO";

export type GetFullProfileDTO = GetPrivateProfileDTO & GetPublicProfileDTO & {
  weighIns: GetFullWeighInDTO[];
};