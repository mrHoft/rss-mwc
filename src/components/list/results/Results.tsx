import React from 'react';
import type { TCharacter } from '~/api/types';
import CardCharacter from '~/components/card/Card';
import Flyout from '~/components/flyout/Flyout';
import { charactersState } from '~/entities/state';

import styles from './results.module.css';

interface ResultsProps {
  results: TCharacter[];
  loading?: boolean;
}

export default function SearchResults({ results }: ResultsProps) {
  const downloadRef = React.useRef<HTMLAnchorElement>(null);
  const [selected, setSelected] = React.useState<number[]>([]);

  const handleCheck = (character: TCharacter) => {
    charactersState.switch(character);
  };

  const handleUncheckAll = () => {
    charactersState.clear();
  };

  const handleDownload = () => {
    const items = charactersState.characters.filter((item) => selected.includes(item.id));
    const output = items
      .map((item) =>
        [item.name, item.gender.title, item.species.title, item.occupation, item.desc, item.cover.url].join(',')
      )
      .join('\n');
    const fileName = `${items.length}_characters.csv`;
    const blob = new Blob([output], { type: 'text/plain' });
    const objectURL = URL.createObjectURL(blob);
    if (downloadRef.current) {
      downloadRef.current.href = objectURL;
      downloadRef.current.download = fileName;
      downloadRef.current.click();
    }
    URL.revokeObjectURL(objectURL);
  };

  const callback = React.useCallback((ids: number[]) => {
    setSelected(ids);
  }, []);

  React.useEffect(() => {
    charactersState.subscribe(callback);
    setSelected(charactersState.selected);

    return () => charactersState.unsubscribe(callback);
  }, []);

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
