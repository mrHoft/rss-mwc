import React from 'react';
import Button from '../button/Button';

import styles from './flyout.module.css';

interface FlyoutProps {
  selected: number;
  unselect: () => void;
  download: () => void;
}

export default function Flyout({ selected, unselect, download }: FlyoutProps) {
  if (!selected) return null;

  return (
    <div
      className={styles.flyout}
      onClick={(e) => {
        e.stopPropagation();
      }}
      data-testid="flyout">
      <div>{`${selected} items are selected`}</div>
      <div className={styles.flyout__btns}>
        <Button onClick={unselect}>Unselect all</Button>
        <Button onClick={download}>Download</Button>
      </div>
    </div>
  );
}
