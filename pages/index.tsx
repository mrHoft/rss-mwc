import type { InferGetStaticPropsType, GetServerSideProps } from 'next';
import CharactersList from '~/components/list/List.tsx';
import apiRequest from '~/api/request.ts';
import type { TResponse, TCharacter } from '~/api/types';
import Message from '~/components/message/message.tsx';

export const getServerSideProps = (async ({ query }) => {
  const { page, search } = query;
  const data = await apiRequest.characters({ page: page ? Number(page) : 1, query: search?.toString() });
  return { props: { data } };
}) satisfies GetServerSideProps<{ data: TResponse<TCharacter[]> }>;

export default function Page({ data }: InferGetStaticPropsType<typeof getServerSideProps>) {
  if (data.error) {
    Message.show(data.error.message, 'error');
    return null;
  }

  return <CharactersList data={data.data ?? []} total={data.meta?.pagination.total ?? 0} />;
}
