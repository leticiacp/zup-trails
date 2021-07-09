import React from 'react';
import './styles.scss';

interface buttonProps {
  label: string;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<buttonProps> = (props) => {
  const {label, disabled = false, className='', onClick} = props;
  return (
    <button
      className={`button ${disabled ? 'button--disabled' : ''} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >{label}</button>
  );
}

export default Button;