import React from 'react';
import { TCharacter } from '../../api/types';

import styles from './card.module.css';

const MEDIA_URL = (import.meta.env.VITE_API_URL ?? '') as string;

interface CardCharacterProps {
  character: TCharacter;
  small?: boolean;
}

export class CardCharacter extends React.Component<CardCharacterProps, CardCharacterProps> {
  constructor(props: CardCharacterProps) {
    super(props);
    if (props.character) {
      this.state = {
        character: props.character,
        small: props.small,
      };
    }
  }

  static getDerivedStateFromProps(props: CardCharacterProps) {
    if (props.character) return props;
    return null;
  }

  private handleNavigate = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!this.state.small) return;
    console.log(this.state.character.id);
  };

  render(): React.ReactNode {
    const { id, name, gender, species, occupation, desc, cover } = this.state.character;
    const coverSrc = `${MEDIA_URL}${this.state.small ? cover.formats.thumbnail.url : cover.url}`;

    return (
      <a className={`${this.state.small ? styles.card_small : styles.card} frame`} href={`/character/${id}`} onClick={this.handleNavigate}>
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
        {desc && (
          <div className={styles.card__desc}>
            {desc.split('\n').map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        )}
      </a>
    );
  }
}
