import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { TCharacter } from '~/api/types';
import CardCharacter from '~/components/card/Card';
import { Context } from '~/entities/context';
import { useSelector } from 'react-redux';
import type { TRootState } from '~/entities/store/store';

import styles from './details.module.css';

const PageDetails: React.FC = () => {
  const [character, setCharacter] = React.useState<TCharacter | null>(null);
  const { available } = useSelector((state: TRootState) => state.characters);
  const ref = React.useRef<HTMLDivElement>(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { searchParams } = React.useContext(Context);

  const handleClose = () => {
    const params = new URLSearchParams(searchParams).toString();
    navigate(params ? `/?${params}` : '/');
  };

  React.useEffect(() => {
    const item = available.find((item) => item.documentId === id);
    setCharacter(item ?? null);
  }, [id, available]);

  React.useEffect(() => {
    const callback = (e: MouseEvent) => {
      if (!e.target || !(e.target instanceof Element) || !ref.current) return;
      if (e.target !== ref.current && !ref.current.contains(e.target)) handleClose();
    };

    document.body.addEventListener('click', callback);
    return () => document.body.removeEventListener('click', callback);
  }, []);

  return (
    <div ref={ref} className={styles.details}>
      <div className={styles.details__close} onClick={handleClose} data-testid="close"></div>
      {character && <CardCharacter character={character} />}
    </div>
  );
};

export default PageDetails;
