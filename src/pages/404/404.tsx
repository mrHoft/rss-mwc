import React from 'react';
import { useNavigate } from 'react-router';
import Button from '~/components/button/Button';

import styles from './404.module.css';

const Page404: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.nothing}>
      <div className={`${styles.nothing__frame} frame`}>
        <h2>(404) No such page</h2>
        <img src="/images/nothing.png" alt="nothing" />
      </div>
      <div className={styles.nothing__btns}>
        <Button onClick={() => navigate('/')}>Go back</Button>
      </div>
    </div>
  );
};

export default Page404;
