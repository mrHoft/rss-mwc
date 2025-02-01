import fetcher from './fetcher';
import { TCharacter } from './types';

export const requestCharacters = async ({ query, page = 1, pageSize = 10 }: { query?: string; page?: number; pageSize?: number }) => {
  const q = query?.trim().toLowerCase();
  const filter = q ? `&filters[$or][0][name][$containsi]=${q}&filters[$or][1][desc][$containsi]=${q}` : '';

  return fetcher.get<TCharacter>(`/mwc-characters?pagination[page]=${page}&pagination[pageSize]=${pageSize}${filter}&populate=*`);
};
