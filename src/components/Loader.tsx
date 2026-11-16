function Loader({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="state" role="status" aria-live="polite">
      <span className="spinner" />
      <p className="state-text">{label}</p>
    </div>
  );
}

export default Loader;
