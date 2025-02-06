interface TMedia {
  id: number;
  url: string;
  ext: string;
  hash: string;
  width: number;
  height: number;
  mime: string;
  createdAt: string;
  size: number;
}

export interface TCharacter {
  id: number;
  documentId: string;
  name: string;
  occupation: string;
  gender: { title: string };
  species: { title: string };
  desc: string;
  cover: TMedia & { id: number; formats: { thumbnail: TMedia } };
  createdAt: string;
  updatedAt: string;
}

export interface TMeta {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface TResponse<T> {
  data?: T;
  meta?: TMeta;
  error?: { message: string; name: string; status: number };
}
