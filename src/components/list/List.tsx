'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SearchResults from '~/components/list/results/Results';
import NothingFound from './nothing/Nothing';
import Loader from '~/components/loader/Loader';
import Pagination from '~/components/pagination/Pagination';
import { TCharacter } from '~/api/types';
import { charactersState } from '~/entities/state';

import styles from './list.module.css';

const pageSize = 6;

interface CharactersListProps {
  data?: TCharacter[];
  total?: number;
}

export default function CharactersList(props: CharactersListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [characters, setCharacters] = React.useState<TCharacter[]>(props.data ?? []);
  const [page, setPage] = React.useState(1);
  const [total, setTotal] = React.useState(props.total ?? 0);

  const handlePageChange = (newPage: number) => {
    const search = searchParams.get('search');
    const newParams: Record<string, string> = { page: (newPage + 1).toString() };
    if (search) newParams.search = search;
    Loader.show();
    router.push(`/?${new URLSearchParams(newParams).toString()}`);
  };

  React.useEffect(() => {
    Loader.hide();
    if (props.total) charactersState.total = props.total;
    if (props.data) charactersState.add(props.data);
    setCharacters(props.data ?? charactersState.characters.filter((item) => charactersState.current.includes(item.id)));
    setPage(searchParams.get('page') ? Number(searchParams.get('page')) : 1);
    setTotal(props.total ?? charactersState.total);
  }, [props]);

  return (
    <section className={styles.characters} aria-label="results">
      {!characters.length && <NothingFound />}
      <SearchResults results={characters} />
      <Pagination page={page - 1} pageSize={pageSize} total={total} onChange={handlePageChange} />
    </section>
  );
}
