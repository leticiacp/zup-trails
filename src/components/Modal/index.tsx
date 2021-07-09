import React from 'react';
import './styles.scss';

interface modalProps {
  opened: boolean;
}

const Modal: React.FC<modalProps> = (props) => {
  const {opened, children } = props;

  const backdropClicked = () => {
    window.dispatchEvent(new CustomEvent('close-dialog'));
  };

  return (
    <>
    {opened && <>
      <div className="modal__backdrop" onClick={(e) => {
        e.stopPropagation();
        backdropClicked();
        }
      }></div>
      <dialog open={opened} className="modal">
        <div className="modal__content">
        {children}
        </div>
      </dialog>
      </>
    }
    </>
  );
}

export default Modal;