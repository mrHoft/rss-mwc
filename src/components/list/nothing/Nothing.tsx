import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import useStorage from '~/entities/useStorage';
import Button from '~/components/button/Button';

import styles from './nothing.module.css';

export default function NothingFound() {
  const { setLastSearch } = useStorage();
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('search');
  const text = query ? `Nothing found for "${query}".` : 'Nothing found.';

  const handleReset = () => {
    setLastSearch('');
    router.push('/');
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
