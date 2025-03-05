import { useNavigate } from 'react-router';

import styles from './sidebar.module.css';

const homeSrc = '/icons/home.svg';
const aboutSrc = '/icons/info.svg';
const gameSrc = '/icons/game.svg';

export default function Sidebar() {
  const navigate = useNavigate();

  const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const { pathname } = e.currentTarget;
    navigate(pathname);
  };

  return (
    <aside className={styles.sidebar}>
      <nav>
        <ul className={styles.nav__list}>
          <li>
            <div>
              <a href="/" onClick={handleNavigate}>
                <img height={20} src={homeSrc} alt="home" />
              </a>
            </div>
          </li>
          <li>
            <div>
              <a href="/about" onClick={handleNavigate}>
                <img height={20} src={aboutSrc} alt="about" />
              </a>
            </div>
          </li>
          <li>
            <div>
              <a href="https://mrhoft.github.io/wrenched/" target="_blank">
                <img height={20} src={gameSrc} alt="game" />
              </a>
            </div>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
