import fetcher from './fetcher';
import { TCharacter } from './types';

const pagination = (page = 1, pageSize = 6) => `pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
const filter = (query?: string) => {
  const q = query?.trim().toLowerCase();
  return q ? `&filters[$or][0][name][$containsi]=${q}&filters[$or][1][desc][$containsi]=${q}` : '';
};

const apiRequest = {
  characters: async ({ query, page, pageSize }: { query?: string; page?: number; pageSize?: number }) =>
    fetcher.get<TCharacter[]>(`/mwc-characters?${pagination(page, pageSize)}${filter(query)}&populate=*`),
  character: async ({ id }: { id: string }) => fetcher.get<TCharacter>(`/mwc-characters/${id}?populate=*`),
};

export default apiRequest;
