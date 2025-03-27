// React
import { ReactNode } from "react";

// CSS
import "./../css/Modal.css";

// Icon
import closeIcon from "./../assets/icons/icon-close-white.svg";

// Interface
interface ModalProps {
  children: ReactNode;
  modal: boolean;
  closeModal: () => void;
  closable?: boolean;
}

const Modal: React.FC<ModalProps> = ({children, modal, closeModal, closable = true }) => (
  <section
    className={`flex-c-c section__modal ${modal ? "modal--show" : ""}`}
    onClick={closable ? closeModal : undefined}
  >
    <article
      className="modal__container"
      onClick={(e) => e.stopPropagation()}
    >
      {closable && (
        <button className="btn__close" onClick={closeModal}>
          <img className="img__close" src={closeIcon} alt="close" />
        </button>
      )}
      {children}
    </article>
  </section>
);

export default Modal;
