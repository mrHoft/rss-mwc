import { useNavigate } from 'react-router';
import Button from '~/components/button/Button';

import styles from './error.module.css';

interface PageErrorProps {
  message: string;
  status: number;
}

export default function PageError({ message, status }: PageErrorProps) {
  const navigate = useNavigate();

  return (
    <div className={styles.nothing}>
      <div className={`${styles.nothing__frame} frame`}>
        <h2>{`(${status}) ${message}`}</h2>
        <img src="/images/nothing.png" alt="nothing" />
      </div>
      <div className={styles.nothing__btns}>
        <Button onClick={() => navigate('/')}>Go back</Button>
      </div>
    </div>
  );
}
