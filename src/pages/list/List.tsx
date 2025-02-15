import React, { useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import SearchResults from '~/pages/list/results/Results';
import Loader from '~/components/loader/Loader';
import { Context } from '~/entities/context';
import Pagination from '~/components/pagination/Pagination';
import type { TAppDispatch } from '~/entities/store/store';
import { useDispatch } from 'react-redux';
import { mwcApi } from '~/api/query';
import { TCharacter } from '~/api/types';
import { updateAvailableCharacters } from '~/entities/store/selections';

import styles from './list.module.css';

const pageSize = 6;

export default function CharactersList() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [characters, setCharacters] = React.useState<TCharacter[]>([]);
  const [total, setTotal] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [page, setPage] = React.useState((Number(searchParams.get('page')) || 1) - 1);
  const { query, setParams } = useContext(Context);
  const dispatch = useDispatch<TAppDispatch>();

  const requestData = () => {
    setLoading(true);
    dispatch(mwcApi.endpoints.getCharacters.initiate({ query, page: page + 1, pageSize }))
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

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    const params: Record<string, string> = { page: `${newPage + 1}` };
    if (query) params['search'] = query;
    setParams(params);
    navigate(`/?${new URLSearchParams(params).toString()}`);
  };

  useEffect(() => {
    setPage(0);
    requestData();
  }, [query]);

  useEffect(() => {
    requestData();
  }, [page]);

  useEffect(() => {
    if (query) setParams({ search: query });
  }, []);

  return (
    <section className={styles.characters} aria-label="results">
      {/* {isError && <p>{JSON.stringify(error)}</p>} */}
      <SearchResults results={characters} loading={loading} />
      <Pagination page={page} pageSize={pageSize} total={total} onChange={handlePageChange} />
      {loading && <Loader />}
    </section>
  );
}
