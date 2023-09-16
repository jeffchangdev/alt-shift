export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button type="button" className="close-button">
          close
        </button>
        {children}
      </div>
    </div>
  );
}
