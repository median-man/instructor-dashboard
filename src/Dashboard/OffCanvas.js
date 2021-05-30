import { classNamesFromArray } from "../util";

function OffCanvas({ show, style, title, onClose, children }) {
  const modalClassName = classNamesFromArray([
    "offcanvas",
    "offcanvas-end",
    show && "show",
  ]);

  return (
    <section
      aria-live="polite"
      className={modalClassName}
      tabIndex={-1}
      id="offCanvas"
      aria-labelledby="offCanvasLabel"
      style={{ visibility: show ? "visible" : "hidden", ...style }}
    >
      <Header onClose={onClose}>{title}</Header>
      <Body>{children}</Body>
    </section>
  );
}

function Header({ onClose, children }) {
  return (
    <div className="offcanvas-header">
      <h5 className="offcanvas-title" id="offCanvasLabel">
        {children}
      </h5>
      <CloseButton onClose={onClose} />
    </div>
  );
}

function Body({ children }) {
  return <div className="offcanvas-body small">{children}</div>;
}

function CloseButton({ onClose }) {
  return (
    <button
      type="button"
      className="btn-close text-reset"
      aria-label="Close"
      onClick={onClose}
    />
  );
}

export default OffCanvas;
