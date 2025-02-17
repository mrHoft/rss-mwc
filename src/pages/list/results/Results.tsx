import React from 'react';
import { TCharacter } from '~/api/types';
import CardCharacter from '~/components/card/Card';
import { useSelector, useDispatch } from 'react-redux';
import type { TRootState, TAppDispatch } from '~/entities/store/store';
import { cardCheck, uncheckAll } from '~/entities/store/selections';
import Flyout from '~/components/flyout/Flyout';

import styles from './results.module.css';

interface ResultsProps {
  results: TCharacter[];
  loading?: boolean;
}

export default function SearchResults({ results }: ResultsProps) {
  const { selected } = useSelector((state: TRootState) => state.selections);
  const { available } = useSelector((state: TRootState) => state.selections);
  const dispatch = useDispatch<TAppDispatch>();
  const downloadRef = React.useRef<HTMLAnchorElement>(null);

  const handleCheck = (id: number, value: boolean) => {
    dispatch(cardCheck({ id, value }));
  };

  const handleUncheckAll = () => {
    dispatch(uncheckAll());
  };

  const handleDownload = () => {
    const items = available.filter((item) => selected.includes(item.id));
    const output = items
      .map((item) =>
        [item.name, item.gender.title, item.species.title, item.occupation, item.desc, item.cover.url].join(',')
      )
      .join('\n');
    const fileName = `${selected.length}_characters.csv`;
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
            checked={selected.includes(item.id)}
            onCheck={handleCheck}
            small
          />
        ))}
      </div>
      <Flyout selected={selected.length} unselect={handleUncheckAll} download={handleDownload} />
      <a ref={downloadRef} style={{ display: 'none' }} />
    </>
  );
}
