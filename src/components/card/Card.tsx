import React from 'react';
import type { TCharacter } from '~/api/types';
import { useNavigate, useSearchParams } from 'react-router';
import Loader from '~/components/loader/Loader';

import styles from './card.module.css';

const MEDIA_URL = (import.meta.env.VITE_API_URL ?? '') as string;

interface CardCharacterProps {
  character: TCharacter;
  small?: boolean;
  checked?: boolean;
  onCheck?: (character: TCharacter) => void;
}

export default function CardCharacter({ character, small, checked, onCheck }: CardCharacterProps) {
  const { documentId, name, gender, species, occupation, desc, cover } = character;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const coverSrc = `${MEDIA_URL}${small ? cover.formats.thumbnail.url : cover.url}`;

  const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (small) {
      e.stopPropagation();
      Loader.show();
      const query = searchParams.toString();
      navigate(`/details/${documentId}${query ? `/?${query}` : ''}`);
    }
  };

  const handleCheck = () => {
    if (onCheck) onCheck(character);
  };

  return (
    <a
      className={`${small ? styles.card_small : styles.card} frame ${small ? 'interactive' : ''}`}
      href={`/details/${documentId}`}
      onClick={handleNavigate}>
      {small && (
        <label className={styles.card__checkbox}>
          <input type="checkbox" checked={checked} onChange={handleCheck} onClick={(e) => e.stopPropagation()} />
        </label>
      )}
      <img className={styles.card__cover} src={coverSrc} alt="cover" />
      <h3>{name}</h3>
      <div className={styles.card__info}>
        <span>Gender:</span>
        <i>{gender.title}</i>
        <span>Species:</span>
        <span>{species?.title}</span>
        <span>Occupation:</span>
        <span className="line-overflow">{occupation}</span>
      </div>
      {desc && !small && (
        <div className={styles.card__desc}>
          {desc.split('\n').map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      )}
    </a>
  );
}
