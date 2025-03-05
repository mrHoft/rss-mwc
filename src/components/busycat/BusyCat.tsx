import React from 'react';

import styles from './busycat.module.css';

const catSrc = '/images/busycat.webp';
const messages = ['Whut?', 'What are you want?', 'I am busy.', 'I am busy.'];
let msgIndex = -1;
let timeout: ReturnType<typeof setTimeout> | null = null;

export default function BusyCat() {
  const [msg, setMsg] = React.useState<string | null>(null);

  const handleClick = () => {
    msgIndex = (msgIndex + 1) % messages.length;
    setMsg(messages[msgIndex]);
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => setMsg(null), 4000);
  };

  return (
    <div className={styles.busycat}>
      <img className={styles.busycat__img} src={catSrc} height={220} alt="cat" onClick={handleClick} />
      {msg && <div className={styles.busycat__speech}>{msg}</div>}
    </div>
  );
}
