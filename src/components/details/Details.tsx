import React from 'react';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import { TCharacter } from '~/api/types';
import CardCharacter from '~/components/card/Card';
import { charactersState } from '~/entities/state';

import styles from './details.module.css';

export default function PageDetails({ id }: { id?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [character, setCharacter] = React.useState<TCharacter | null>(null);
  const ref = React.useRef<HTMLDivElement>(null);

  const handleClose = () => {
    const query = searchParams.toString();
    router.push(`/${query ? `?${query}` : ''}`);
  };

  React.useEffect(() => {
    const item = charactersState.characters.find((item) => item.documentId === id);
    setCharacter(item ?? null);
  }, [id]);

  React.useEffect(() => {
    const callback = (e: MouseEvent) => {
      if (!e.target || !(e.target instanceof Element) || !ref.current) return;
      if (e.target !== ref.current && !ref.current.contains(e.target)) handleClose();
    };

    document.body.addEventListener('click', callback);
    return () => document.body.removeEventListener('click', callback);
  }, []);

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
