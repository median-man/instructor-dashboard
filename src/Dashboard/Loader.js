function Loader({ children }) {
  return (
    <div className="d-flex h-100 w-100 justify-content-center align-items-center flex-column">
      <div
        style={{ width: "3.5rem", height: "3.5rem" }}
        className="spinner-border text-secondary mb-4"
        role="status"
      ></div>
      <p className="lead">{children}</p>
    </div>
  );
}

export default Loader;
