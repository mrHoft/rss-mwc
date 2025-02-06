import React from 'react';
import { Context } from '~/entities/context';
import { TCharacter } from '~/api/types';
import CardCharacter from '../card/Card';
import Button from '~/components/button/Button';

import styles from './results.module.css';

interface ResultsProps {
  results: TCharacter[];
  loading?: boolean;
}

export default function SearchResults({ results, loading }: ResultsProps) {
  const { query, setSearch } = React.useContext(Context);

  if (!results.length && !loading) {
    return (
      <>
        <div className={`${styles.nothing} frame`}>
          <h2>{`Nothing found for "${query}".`}</h2>
          <img src="/images/nothing.png" alt="nothing" />
        </div>
        <div className={styles.btns}>
          <Button onClick={() => setSearch()}>Reset</Button>
        </div>
      </>
    );
  }

  return (
    <div className={styles.cards}>
      {results.map((item) => (
        <CardCharacter key={item.id} character={item} small />
      ))}
    </div>
  );
}
