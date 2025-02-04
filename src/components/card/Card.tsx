import React from 'react';
import { TCharacter } from '~/api/types';
import { useNavigate } from 'react-router';

import styles from './card.module.css';

const MEDIA_URL = (import.meta.env.VITE_API_URL ?? '') as string;

interface CardCharacterProps {
  character: TCharacter;
  small?: boolean;
}

export function CardCharacter({ character, small }: CardCharacterProps) {
  const { id, name, gender, species, occupation, desc, cover } = character;
  const navigate = useNavigate();
  const coverSrc = `${MEDIA_URL}${small ? cover.formats.thumbnail.url : cover.url}`;

  const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (small) {
      e.stopPropagation();
      navigate(`/character/${character.id}`);
    }
  };

  return (
    <a
      className={`${small ? styles.card_small : styles.card} frame ${small ? 'interactive' : ''}`}
      href={`/character/${id}`}
      onClick={handleNavigate}>
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
