import React from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import type { TCharacter } from '~/api/types';
import CardCharacter from '~/components/card/Card';
import { charactersState } from '~/entities/state';
import Loader from '~/components/loader/Loader';

import styles from './details.module.css';

export default function PageDetails({ id }: { id?: string }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [character, setCharacter] = React.useState<TCharacter | null>(null);
  const ref = React.useRef<HTMLDivElement>(null);

  const handleClose = () => {
    console.log('handleClose');
    const query = searchParams.toString();
    Loader.show();
    navigate(`/${query ? `?${query}` : ''}`);
  };

  React.useEffect(() => {
    if (id) {
      const item = charactersState.characters.find((item) => item.documentId === id);
      setCharacter(item ?? null);
    }
  }, [id]);

  return (
    <section ref={ref} className={styles.details}>
      <div className={styles.details__close} onClick={handleClose} data-testid="close"></div>
      {character && <CardCharacter character={character} />}
      {!character && (
        <div className="frame">
          <h3>Character not found</h3>
        </div>
      )}
    </section>
  );
}
