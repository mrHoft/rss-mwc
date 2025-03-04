'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import useStorage from '~/entities/useStorage';

import styles from './search.module.css';

export default function Search() {
  const { getLastSearch, setLastSearch } = useStorage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const ref = React.useRef<HTMLInputElement>(null);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.value = event.target.value.replaceAll(' ', '');
  };

  const handleClear = () => {
    if (ref.current) ref.current.value = '';
    setLastSearch('');
    router.push('/');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const value = String(form.get('query'));
    setLastSearch(value);
    router.push(`/?search=${value}`);
  };

  React.useEffect(() => {
    const query = searchParams.get('search');
    if (ref.current) ref.current.value = query ?? '';
  }, [searchParams]);

  React.useEffect(() => {
    const query = getLastSearch();
    if (ref.current && query) {
      ref.current.value = query;
      const page = searchParams.get('page');
      const newParams: Record<string, string> = { search: query };
      if (page) newParams.page = page;
      router.push(`/?${new URLSearchParams(newParams).toString()}`);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit} className={styles.search} onClick={(e) => e.stopPropagation()}>
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
