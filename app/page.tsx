import React from 'react';
import CharactersList from '~/components/list/List.tsx';
import apiRequest from '~/api/request.ts';
import PageError from '~/components/error/Error';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ searchParams }: PageProps) {
  const { page, search } = await searchParams;
  const data = await apiRequest.characters({ page: page ? Number(page) : 1, query: search?.toString() });

  if (data.error) return <PageError message={data.error.message} status={data.error.status} />;

  return <CharactersList data={data.data ?? []} total={data.meta?.pagination.total ?? 0} />;
}
