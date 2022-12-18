import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Backdrop, ModalWindow, ModalImage } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ src, onClose }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <Backdrop onClick={handleBackdropClick}>
      <ModalWindow>
        <ModalImage src={src} alt="image" />
      </ModalWindow>
    </Backdrop>,
    modalRoot
  );
};
