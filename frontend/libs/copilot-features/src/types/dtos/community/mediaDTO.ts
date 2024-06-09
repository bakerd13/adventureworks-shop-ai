export type MediaDTO = {
  mediaType?: MediaType;
  content?: string;
  Version?: string;
}

enum MediaType {
  UploadedImage,
  EmbeddedYoutubeVideo,
}
