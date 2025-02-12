import React from 'react';
import { Context } from '~/entities/context';
import { TCharacter } from '~/api/types';
import CardCharacter from '~/components/card/Card';
import { useSelector, useDispatch } from 'react-redux';
import type { TRootState, TAppDispatch } from '~/entities/store/store';
import { cardCheck } from '~/entities/store/selections';
import Button from '~/components/button/Button';

import styles from './results.module.css';

interface ResultsProps {
  results: TCharacter[];
  loading?: boolean;
}

export default function SearchResults({ results, loading }: ResultsProps) {
  const { query, setSearch } = React.useContext(Context);
  const { data: selections } = useSelector((state: TRootState) => state.selections);
  const dispatch = useDispatch<TAppDispatch>();

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

  const handleCheck = (id: number, value: boolean) => {
    dispatch(cardCheck({ id, value }));
  };

  return (
    <div className={styles.cards}>
      {results.map((item) => (
        <CardCharacter
          key={item.id}
          character={item}
          checked={selections.includes(item.id)}
          onCheck={handleCheck}
          small
        />
      ))}
    </div>
  );
}
