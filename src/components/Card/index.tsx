import React from 'react';
import { TrailResume } from '../../model/trails';
import Button from '../Button';
import './styles.scss';

interface cardProps {
  trail: TrailResume;
}

const Card: React.FC<cardProps> = (props) => {
  const { trail } = props;
  const { description, id, image, name } = trail;

  const onClick = () => {
    window.dispatchEvent(new CustomEvent('request-trail', {detail: id}));
  };

  return (
    <article className="card__item">
      <header className="card__header">
        <img className="card__image" src={image} alt="Imagem da trilha" />
      </header>
      <div className="card__content">
      <h1 className="card__title">{name}</h1>
      <p className="card__description">{description}</p>
      </div>
      <footer className="card__footer">
        <Button className="card__button" label="detalhes" ariaLabel={`Mais detalhes da ${name}`} onClick={onClick}/>
      </footer>
  
    </article>
  );
}

export default Card;