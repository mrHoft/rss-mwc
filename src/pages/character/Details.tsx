import React from 'react';
import { useParams, useNavigate } from 'react-router';
import stateManager from '~/entities/state';
import apiRequest from '~/api/request';
import { TCharacter } from '~/api/types';
import CardCharacter from '~/components/card/Card';
import Loader from '~/components/loader/Loader';
import { Context } from '~/entities/context';

import styles from './details.module.css';

const stupidActionForTheTask = true;

const PageDetails: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [character, setCharacter] = React.useState<TCharacter | null>(null);
  const ref = React.useRef<HTMLDivElement>(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { searchParams } = React.useContext(Context);

  const handleClose = () => {
    const params = new URLSearchParams(searchParams).toString();
    navigate(params ? `/?${params}` : '/');
  };

  React.useEffect(() => {
    if (id) {
      if (stupidActionForTheTask) {
        setLoading(true);
        apiRequest
          .character({ id })
          .then(({ data, error }) => {
            if (data) return setCharacter(data);
            if (error) console.log(error.message);
          })
          .finally(() => {
            setLoading(false);
          });
        return;
      }
      const item = stateManager.characters.find((item) => item.documentId === id);
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

  return (
    <div ref={ref} className={styles.details}>
      <div className={styles.details__close} onClick={handleClose} data-testid="close"></div>
      {loading && <Loader flat />}
      {character && <CardCharacter character={character} />}
    </div>
  );
};

export default PageDetails;
