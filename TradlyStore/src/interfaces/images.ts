export type ImageResource = {
  id?: string;
  imgUrl: string;
  blurHash?: string;
};

export interface ImagePayload {
  image: File;
}

export interface ImageFile {
  filename: string;
  name: string;
  mime: string;
  extension: string;
  url: string;
}

export interface ImageResponse {
  data: {
    id: string;
    title: string;
    url_viewer: string;
    url: string;
    display_url: string;
    width: number;
    height: number;
    size: number;
    time: number;
    expiration: number;
    image: ImageFile;
    thumb: ImageFile;
    medium: ImageFile;
  };
}
