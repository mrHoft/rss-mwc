type TMedia = {
  id: number;
  url: string;
  ext: string;
  hash: string;
  width: number;
  height: number;
  mime: string;
  createdAt: string;
  size: number;
};

export type TCharacter = {
  id: number;
  name: string;
  occupation: string;
  gender: { title: string };
  species: { title: string };
  desc: string;
  cover: TMedia & { id: number; formats: { thumbnail: TMedia } };
  createdAt: string;
  updatedAt: string;
};

export type TMeta = {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
};

export type TResponse<T> = {
  data?: T[];
  meta?: TMeta;
  error?: { message: string; name: string; status: number };
};
