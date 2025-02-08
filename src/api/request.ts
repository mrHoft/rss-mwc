import fetcher from './fetcher';
import { TCharacter } from './types';

const pagination = (page = 1, pageSize = 10) => `pagination[page]=${page}&pagination[pageSize]=${pageSize}`;

const apiRequest = {
  characters: async ({ query, page, pageSize }: { query?: string; page?: number; pageSize?: number }) => {
    const q = query?.trim().toLowerCase();
    const filter = q ? `&filters[$or][0][name][$containsi]=${q}&filters[$or][1][desc][$containsi]=${q}` : '';

    return fetcher.get<TCharacter[]>(`/mwc-characters?${pagination(page, pageSize)}${filter}&populate=*`);
  },
  character: async ({ id }: { id: string }) => fetcher.get<TCharacter>(`/mwc-characters/${id}?populate=*`),
};

export default apiRequest;
