export default function PageHead({ className, title, children }) {
  return (
    <section className={`page-head ${className}`}>
      <div>
        <h1>{title}</h1>
        <p>{children}</p>
      </div>
    </section>
  );
}
