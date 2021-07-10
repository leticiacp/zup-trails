import React from 'react';
import './styles.scss';

interface buttonProps {
  label: string;
  id?: string;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
  onClick?: () => void;
}

const Button: React.FC<buttonProps> = (props) => {
  const { label, id, disabled = false, className = '', onClick, ariaLabel } = props;
  return (
    <button
      id={id}
      className={`button ${disabled ? 'button--disabled' : ''} ${className}`}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
    >{label}</button>
  );
}

export default Button;