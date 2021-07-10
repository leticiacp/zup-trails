import React, { useRef, useEffect, useCallback } from 'react';
import './styles.scss';

interface modalProps {
  opened: boolean;
}

const Modal: React.FC<modalProps> = (props) => {
  const { opened, children } = props;
  const dialogRef = useRef<HTMLDialogElement>(null);

  const closeDialog = () => {
    window.dispatchEvent(new CustomEvent('close-dialog'));
  };

  const handleKeyPress = useCallback(event => {
    const { keyCode } = event;

    if (keyCode === 27) {
      closeDialog();
    }
  }, []);

  useEffect(function () {
    window.addEventListener('keyup', handleKeyPress);

    return function cleanup() {
      window.removeEventListener('keyup', handleKeyPress);
    }
  }, [handleKeyPress]);

  return (
    <>
      {opened && <>
        <div className="modal__backdrop" onClick={(e) => {
          e.stopPropagation();
          closeDialog();
        }}></div>
        <dialog
          ref={dialogRef}
          aria-modal="true"
          aria-labelledby="dialogTitle"
          open={opened}
          className="modal"
          tabIndex={-1}>
          <header className="modal__header">
            <button
              className="modal__close-button modal--hide-desktop"
              aria-label="botão de fechar"
              onClick={(e) => {
              e.stopPropagation();
              closeDialog();
            }}>x</button>
          </header>
          {children}
        </dialog>
      </>
      }
    </>
  );
}

export default Modal;