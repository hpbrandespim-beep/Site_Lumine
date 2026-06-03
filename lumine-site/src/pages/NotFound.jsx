import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="not-found-page">
      <section>
        <p className="kicker">404</p>
        <h1>Página não encontrada.</h1>
        <p>Esse caminho não existe ou mudou de lugar. Volte para o início e continue navegando pela Lumine.</p>
        <div className="not-found-actions">
          <Link className="pill" to="/index.html">Voltar ao início</Link>
          <Link className="outline" to="/eventos.html">Ver eventos</Link>
        </div>
      </section>
    </main>
  );
}
