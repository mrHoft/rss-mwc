import React from 'react';
import { useSearchParams } from 'react-router';
import useStorage from '~/entities/useStorage';

import styles from './search.module.css';

export default function Search() {
  const { getLastSearch, setLastSearch } = useStorage();
  const [searchParams, setSearchParams] = useSearchParams();
  const ref = React.useRef<HTMLInputElement>(null);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.value = event.target.value.replaceAll(' ', '');
  };

  const handleClear = () => {
    if (ref.current) ref.current.value = '';
    setSearchParams({});
    setLastSearch('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const value = String(form.get('query'));
    setSearchParams({ search: value });
    setLastSearch(value);
  };

  React.useEffect(() => {
    const query = searchParams.get('search');
    if (ref.current && query) ref.current.value = query;
  }, [searchParams.get('search')]);

  React.useEffect(() => {
    const query = getLastSearch();
    if (ref.current && query) {
      ref.current.value = query;
      const page = searchParams.get('page');
      const newParams: Record<string, string> = { search: query };
      if (page) newParams.page = page;
      setSearchParams(newParams);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit} className={styles.search}>
      <div className={styles.search__field}>
        <input
          ref={ref}
          type="text"
          name="query"
          placeholder="search"
          autoComplete="off"
          className={styles.search__input}
          onInput={handleInput}
        />
        <button type="button" className={styles.search__clear} onClick={handleClear} />
        <button type="submit" className={styles.search__submit} />
      </div>
    </form>
  );
}
