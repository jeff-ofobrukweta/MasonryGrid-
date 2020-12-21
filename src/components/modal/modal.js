import './modal.css';

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div className="cancel__btn">
          <button className="damage" onClick={handleClose}>x</button>
        </div>
        {children}
      </section>
    </div>
  );
};

export default Modal;