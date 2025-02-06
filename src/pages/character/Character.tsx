import React from 'react';
import { useParams, useNavigate } from 'react-router';
import stateManager from '~/entities/state';
import { TCharacter } from '~/api/types';
import { CardCharacter } from '~/components/card/Card';

import styles from './character.module.css';

const PageCharacter: React.FC = () => {
  const [character, setCharacter] = React.useState<TCharacter | null>(null);
  const ref = React.useRef<HTMLDivElement>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleClose = () => navigate('/');

  React.useEffect(() => {
    const RequestedId = Number(id);
    if (Number.isFinite(RequestedId)) {
      const item = stateManager.characters.find((item) => item.id === RequestedId);
      setCharacter(item ?? null);
    }
  }, [id]);

  React.useEffect(() => {
    const callback = (e: MouseEvent) => {
      if (!e.target || !(e.target instanceof Element) || !ref.current) return;
      if (e.target !== ref.current && !ref.current.contains(e.target)) handleClose();
    };

    document.body.addEventListener('click', callback);
    return () => document.body.removeEventListener('click', callback);
  }, []);

  if (!character) return null;

  return (
    <div ref={ref} className={styles.character}>
      <div className={styles.character__close} onClick={handleClose} data-testid="close"></div>
      <CardCharacter character={character} />
    </div>
  );
};

export default PageCharacter;
