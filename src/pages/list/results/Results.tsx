import React from 'react';
import { Context } from '~/entities/context';
import { TCharacter } from '~/api/types';
import CardCharacter from '~/components/card/Card';
import { useSelector, useDispatch } from 'react-redux';
import type { TRootState, TAppDispatch } from '~/entities/store/store';
import { cardCheck, uncheckAll } from '~/entities/store/selections';
import Button from '~/components/button/Button';
import Flyout from '~/components/flyout/flyout';

import styles from './results.module.css';

interface ResultsProps {
  results: TCharacter[];
  loading?: boolean;
}

export default function SearchResults({ results, loading }: ResultsProps) {
  const { query, setSearch } = React.useContext(Context);
  const { data: selections } = useSelector((state: TRootState) => state.selections);
  const { available } = useSelector((state: TRootState) => state.characters);
  const dispatch = useDispatch<TAppDispatch>();
  const downloadRef = React.useRef<HTMLAnchorElement>(null);

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

  const handleUncheckAll = () => {
    dispatch(uncheckAll());
  };

  const handleDownload = () => {
    const items = available.filter((item) => selections.includes(item.id));
    const output = items
      .map((item) =>
        [item.name, item.gender.title, item.species.title, item.occupation, item.desc, item.cover.url].join(',')
      )
      .join('\n');
    const fileName = `${selections.length}_characters.csv`;
    const blob = new Blob([output], { type: 'text/plain' });
    const objectURL = URL.createObjectURL(blob);
    if (downloadRef.current) {
      downloadRef.current.href = objectURL;
      downloadRef.current.download = fileName;
      downloadRef.current.click();
    }
    URL.revokeObjectURL(objectURL);
  };

  return (
    <>
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
      <Flyout selected={selections.length} unselect={handleUncheckAll} download={handleDownload} />
      <a ref={downloadRef} style={{ display: 'none' }} />
    </>
  );
}
