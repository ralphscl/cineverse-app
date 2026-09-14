export default function RequestError({ retry }) {
  return (
    <div role="alert">
      <p>We couldn’t load these results.</p>
      <button type="button" className="btn" onClick={retry}>Try again</button>
    </div>
  );
}
