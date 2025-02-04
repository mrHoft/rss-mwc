import React from 'react';
import { Context } from '~/entities/context';
import { TCharacter } from '~/api/types';
import { CardCharacter } from '../card/Card';

import styles from './results.module.css';

interface ResultsProps {
  results: TCharacter[];
  loading?: boolean;
}

export default function SearchResults({ results, loading }: ResultsProps) {
  const { query } = React.useContext(Context);

  if (!results.length && !loading) {
    return (
      <div className={`${styles.nothing} frame`}>
        <p>{`Nothing found for "${query}".`}</p>
        <img src="/images/nothing.png" alt="nothing" />
      </div>
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
