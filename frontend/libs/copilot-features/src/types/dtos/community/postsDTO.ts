import { PaginationDTO } from "../baseDtos/paginationDTO";
import { PostDTO } from "./postDTO";

export type PostsDTO = PaginationDTO & {
  data: PostDTO[];
}