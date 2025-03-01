import { useRouter } from 'next/router';
import Button from '~/components/button/Button';

import styles from './error.module.css';

interface PageErrorProps {
  message: string;
  status: number;
}

export default function PageError({ message, status }: PageErrorProps) {
  const router = useRouter();

  return (
    <div className={styles.nothing}>
      <div className={`${styles.nothing__frame} frame`}>
        <h2>{`(${status}) ${message}`}</h2>
        <img src="/images/nothing.png" alt="nothing" />
      </div>
      <div className={styles.nothing__btns}>
        <Button onClick={() => router.push('/')}>Go back</Button>
      </div>
    </div>
  );
}
