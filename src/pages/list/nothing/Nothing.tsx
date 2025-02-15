import { useSearchParams } from 'react-router';
import Button from '~/components/button/Button';

import styles from './nothing.module.css';

export default function NothingFound() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('search');
  const text = query ? `Nothing found for "${query}".` : 'Nothing found.';

  return (
    <>
      <div className={`${styles.nothing} frame`}>
        <h2>{text}</h2>
        <img src="/images/nothing.png" alt="nothing" />
      </div>
      {query && (
        <div className={styles.btns}>
          <Button onClick={() => setSearchParams()}>Reset</Button>
        </div>
      )}
    </>
  );
}
