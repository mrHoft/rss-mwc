import fetcher from './fetcher';
import { TCharacter } from './types';

export const requestCharacters = async ({ query, page = 1, pageSize = 10 }: { query?: string; page?: number; pageSize?: number }) => {
  // const category = query.trim().toLowerCase();
  const filter = query ? `&filters[$or][0][name][$contains]=${query}&filters[$or][1][desc][$contains]=${query}` : '';

  return fetcher.get<TCharacter>(`/mwc-characters?pagination[page]=${page}&pagination[pageSize]=${pageSize}${filter}&populate=*`);
};
