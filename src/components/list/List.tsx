import React from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import SearchResults from '~/components/list/results/Results';
import NothingFound from './nothing/Nothing';
import Loader from '~/components/loader/Loader';
import Pagination from '~/components/pagination/Pagination';
import type { TCharacter } from '~/api/types';
import { charactersState } from '~/entities/state';

import styles from './list.module.css';

const pageSize = 6;

export default function CharactersList({ data, total }: { data?: TCharacter[]; total?: number }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [characters, setCharacters] = React.useState<TCharacter[]>([]);
  const [page, setPage] = React.useState(1);

  const handlePageChange = (newPage: number) => {
    Loader.show();
    const search = searchParams.get('search');
    const newParams: Record<string, string> = { page: (newPage + 1).toString() };
    if (search) newParams.search = search;
    setPage(newPage + 1);
    navigate(`/?${new URLSearchParams(newParams).toString()}`);
  };

  React.useEffect(() => {
    Loader.hide();
    setCharacters(data ?? []);
    if (data) charactersState.add(data);
  }, [data]);

  React.useEffect(() => {
    const page = Number(searchParams.get('page')) || 1;
    setPage(page);
  }, [searchParams]);

  return (
    <section className={styles.characters} aria-label="results">
      {!characters.length && <NothingFound />}
      <SearchResults results={characters} />
      <Pagination page={page - 1} pageSize={pageSize} total={total ?? 0} onChange={handlePageChange} />
    </section>
  );
}
