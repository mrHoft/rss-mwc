import React from 'react';
import Storage from '~/utils/storage';
import { Context } from '~/entities/context';

import styles from './search.module.css';

const storage = new Storage();

export default function Search() {
  const { query, setSearch } = React.useContext(Context);
  const ref = React.useRef<HTMLInputElement>(null);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.value = event.target.value.replaceAll(' ', '');
  };

  const handleClear = () => {
    if (ref.current) ref.current.value = '';
    setSearch('');
    storage.set('lastSearch', '');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const value = String(form.get('request'));
    storage.set('lastSearch', value);
    setSearch(value);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.search}>
      <div className={styles.search__field}>
        <input
          ref={ref}
          type="text"
          name="request"
          placeholder="search"
          autoComplete="off"
          className={styles.search__input}
          defaultValue={query}
          onInput={handleInput}
        />
        <div className={styles.search__clear} onClick={handleClear}></div>
        <button type="submit" className={styles.search__submit} />
      </div>
    </form>
  );
}
