import { ImageType } from "../images/image";

export type Seo = {
  _type: string;
  metaTitle?: string;
  metaImage: ImageType;
  metaDescription?: string;
  metaKeywords?: string;
};

