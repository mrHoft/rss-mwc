import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { TResponse, TCharacter } from './types';

const { VITE_API_URL, VITE_API_TOKEN } = import.meta.env;

const pagination = (page = 1, pageSize = 10) => `pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
const filters = (query?: string) => {
  const q = query?.trim().toLowerCase();
  return q ? `&filters[$or][0][name][$containsi]=${q}&filters[$or][1][desc][$containsi]=${q}` : '';
};

export const mwcApi = createApi({
  reducerPath: 'mwcApi',
  baseQuery: fetchBaseQuery({
    baseUrl: VITE_API_URL,
    prepareHeaders: (headers) => {
      headers.set('authorization', `Bearer ${VITE_API_TOKEN}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCharacters: builder.query<TResponse<TCharacter[]>, { query?: string; page?: number; pageSize?: number }>({
      query: ({ query, page, pageSize }) =>
        `/api/mwc-characters?${pagination(page, pageSize)}${filters(query)}&populate=*`,
    }),
  }),
});

export const { useGetCharactersQuery } = mwcApi;
