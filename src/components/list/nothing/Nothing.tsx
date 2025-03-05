import { useNavigate, useSearchParams } from 'react-router';
import useStorage from '~/entities/useStorage';
import Button from '~/components/button/Button';

import styles from './nothing.module.css';

export default function NothingFound() {
  const { setLastSearch } = useStorage();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('search');
  const text = query ? `Nothing found for "${query}".` : 'Nothing found.';

  const handleReset = () => {
    setLastSearch('');
    navigate('/');
  };

  return (
    <>
      <div className={`${styles.nothing} frame`}>
        <h2>{text}</h2>
        <img src="/images/nothing.png" alt="nothing" />
      </div>
      {query && (
        <div className={styles.btns}>
          <Button onClick={handleReset}>Reset</Button>
        </div>
      )}
    </>
  );
}
