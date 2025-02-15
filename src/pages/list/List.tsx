import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import SearchResults from '~/pages/list/results/Results';
import Loader from '~/components/loader/Loader';
import Pagination from '~/components/pagination/Pagination';
import type { TAppDispatch } from '~/entities/store/store';
import { useDispatch } from 'react-redux';
import { mwcApi } from '~/api/query';
import { TCharacter } from '~/api/types';
import { updateAvailableCharacters } from '~/entities/store/selections';

import styles from './list.module.css';

const pageSize = 6;

export default function CharactersList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [characters, setCharacters] = React.useState<TCharacter[]>([]);
  const [total, setTotal] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [page, setPage] = React.useState((Number(searchParams.get('page')) || 1) - 1);
  const [query, setQuery] = React.useState(searchParams.get('search'));
  const dispatch = useDispatch<TAppDispatch>();

  const requestData = (nwPage = page) => {
    setLoading(true);
    dispatch(
      mwcApi.endpoints.getCharacters.initiate({ query: searchParams.get('search') ?? '', page: nwPage + 1, pageSize })
    )
      .then(({ data: response, isError, error }) => {
        if (isError) console.error(error);
        if (response) {
          setCharacters(response.data ?? []);
          setTotal(response.meta?.pagination.total ?? 0);
          dispatch(updateAvailableCharacters(response.data ?? []));
        }
      })
      .finally(() => setLoading(false));
  };

  const handlePageChange = (page: number) => {
    setPage(page);
    const search = searchParams.get('search');
    const newParams: Record<string, string> = { page: (page + 1).toString() };
    if (search) newParams.search = search;
    setSearchParams(newParams);
  };

  useEffect(() => {
    requestData();
  }, [page]);

  React.useEffect(() => {
    const newQuery = searchParams.get('search');
    if (newQuery !== query) {
      setQuery(newQuery);
      setPage(0);
      requestData(0);
    }
  }, [searchParams.get('search')]);

  return (
    <section className={styles.characters} aria-label="results">
      {/* {isError && <p>{JSON.stringify(error)}</p>} */}
      <SearchResults results={characters} loading={loading} />
      <Pagination page={page} pageSize={pageSize} total={total} onChange={handlePageChange} />
      {loading && <Loader />}
    </section>
  );
}
