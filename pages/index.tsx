import React from 'react';
import type { InferGetStaticPropsType, GetServerSideProps } from 'next';
import CharactersList from '~/components/list/List.tsx';
import apiRequest from '~/api/request.ts';
import type { TResponse, TCharacter } from '~/api/types';
import PageError from '~/components/error/Error';
import Message from '~/components/message/message.tsx';

export const getServerSideProps = (async ({ query }) => {
  const { page, search } = query;
  const data = await apiRequest.characters({ page: page ? Number(page) : 1, query: search?.toString() });
  return { props: { data } };
}) satisfies GetServerSideProps<{ data: TResponse<TCharacter[]> }>;

export default function Page({ data }: InferGetStaticPropsType<typeof getServerSideProps>) {
  React.useEffect(() => {
    if (data.error) {
      Message.show(data.error.message, 'error');
    }
  }, [data.error]);

  if (data.error) return <PageError message={data.error.message} status={data.error.status} />;

  return <CharactersList data={data.data ?? []} total={data.meta?.pagination.total ?? 0} />;
}
