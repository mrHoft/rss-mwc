import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import Button from '~/components/button/Button';
import Loader from '../loader/Loader';

import styles from './about.module.css';

const imgUrls = ['/images/about01.webp', '/images/about02.webp', '/images/about03.webp'];

export default function PageAbout() {
  const navigate = useNavigate();

  const handleBack = () => {
    Loader.show();
    navigate('/');
  };

  useEffect(Loader.hide, []);

  return (
    <section aria-label="about">
      <div className={`${styles.about} frame`}>
        <article>
          <div>
            <h3>About:</h3>
            <p>
              <a href="https://rs.school/">RSSchool</a> React educational project.
            </p>
            <div>Technology stack:</div>
            <ul className={styles.about__stack}>
              <li>React</li>
              <li>React router SSR</li>
              <li>TypeScript</li>
              <li>Vite</li>
              <li>Vitest</li>
              <li>Strapi ORM</li>
            </ul>
          </div>
          <img className={styles.about__img} src={imgUrls[0]} alt="about" />
        </article>
        <article>
          <div>
            <h3>Author:</h3>
            <p>
              Developed by <a href="https://github.com/mrHoft">mrHoft</a> in 2025.
            </p>
            <p>
              Inspirated by <a href="https://www.youtube.com/@Zeurel">Zeurel</a> "
              <a href="https://www.youtube.com/@MonkeyWrenchSeries">Monkey Wrench</a>".
            </p>
          </div>
          <img className={styles.about__img} src={imgUrls[1]} alt="about" />
        </article>
      </div>
      <div className={styles.about__btns}>
        <Button onClick={handleBack}>Go back</Button>
      </div>
    </section>
  );
}
