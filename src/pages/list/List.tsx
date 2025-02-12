import React, { useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import SearchResults from '~/pages/list/results/Results';
import Loader from '~/components/loader/Loader';
import { Context } from '~/entities/context';
import Pagination from '~/components/pagination/Pagination';
import type { TRootState, TAppDispatch } from '~/entities/store/store';
import { fetchCharacters } from '~/entities/store/characters';
import { useSelector, useDispatch } from 'react-redux';

import styles from './list.module.css';

const pageSize = 6;

export default function CharactersList() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch<TAppDispatch>();
  const { current: characters, total, loading } = useSelector((state: TRootState) => state.characters);
  const [page, setPage] = React.useState((Number(searchParams.get('page')) || 1) - 1);
  const { query, setParams } = useContext(Context);

  const requestData = () => {
    dispatch(fetchCharacters({ query, page: page + 1, pageSize }))
      .unwrap()
      .catch((err) => console.log(err));
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

  useEffect(requestData, [page]);

  useEffect(() => {
    if (query) setParams({ search: query });
  }, []);

  return (
    <section className={styles.characters} aria-label="results">
      {/* {state.error && <p>{state.error}</p>} */}
      <SearchResults results={characters} loading={loading === 'pending'} />
      <Pagination page={page} pageSize={pageSize} total={total} onChange={handlePageChange} />
      {loading === 'pending' && <Loader />}
    </section>
  );
}
