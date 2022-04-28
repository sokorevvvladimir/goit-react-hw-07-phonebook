import styled from 'styled-components';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const BackdropDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);

  &.isHidden {
    visibility: hidden;
    opacity: 0;
    pointer-events: none;
  }

  &.isHidden .modal {
    transform: translate(-50%, -50%) scale(0.8);
  }
`;

const ContentDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1);
  transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 300px;
  max-width: 600px;
  width: 360px;
  padding: 12px;
  background-color: #ffffff;
  border-radius: 3px;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);

      @media (min-width: 769px){
    width: 50%;
  };
  @media (min-width: 1024px) {
    width: 40%;
  })
`;

const Modal = ({ isShown, onClose, children }) => {
  const modalRoot = document.getElementById('modal-root');
  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  useEffect(() => {
    const backdrop = document.getElementById('backdrop');
    const ToggleClass = () => {
      if (isShown) {
        backdrop.classList.remove('isHidden');
        return;
      }
    };
    ToggleClass();
  }, [isShown]);

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <BackdropDiv
      className="isHidden"
      id="backdrop"
      onClick={handleBackdropClick}
    >
      <ContentDiv className="modal">{children}</ContentDiv>
    </BackdropDiv>,
    modalRoot
  );
};

export default Modal;
