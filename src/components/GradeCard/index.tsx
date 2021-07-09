import React from 'react';
import './styles.scss';

interface gradeCardProps {
  name: string;
  duration: number
}

const GradeCard: React.FC<gradeCardProps> = (props) => {
  const { name, duration } = props;

  return (
    <>
    <div className="grade-card__container">
    <div>{name}</div>
    <div>{duration} horas</div>
    </div>
    </>
  );
}

export default GradeCard;