import { Link } from 'react-router-dom';
import { useSiteContent } from '../hooks/useSiteContent.js';

export default function NotFound() {
  const { notFound } = useSiteContent();

  return (
    <main className="not-found-page">
      <section>
        <p className="kicker">{notFound.kicker}</p>
        <h1>{notFound.title}</h1>
        <p>{notFound.body}</p>
        <div className="not-found-actions">
          <Link className="pill" to="/index.html">{notFound.primaryCta}</Link>
          <Link className="outline" to="/eventos.html">{notFound.secondaryCta}</Link>
        </div>
      </section>
    </main>
  );
}
