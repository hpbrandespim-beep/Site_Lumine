import { asset, whatsappLinks } from '../data/site.js';

export default function Meditacao() {
  return (
    <main className="meditation-page">
      <section className="meditation-paper-head" aria-label="Meditação de conexão interna">
        <span className="sr-only">Meditação de conexão interna. Aprenda a usar sua respiração para se acalmar em situações que te vulnerariam.</span>
      </section>

      <section className="meditation-offer">
        <img src={asset('photo-mentoria-luz.png')} alt="Mulher de vestido branco segurando um livro aberto" />
        <div className="meditation-offer-card">
          <h1>Meditação</h1>
          <p>4 sessões online individuais de 1 hora</p>
          <ul>
            <li>Meditação de conexão interna em todas as sessões</li>
            <li>Identificação e liberação de crenças limitantes</li>
            <li>Clareza em relação aos seus desejos e objetivos</li>
            <li>Reestruturação de pensamentos para liberação de crenças</li>
            <li>Guia prático para a rotina: fazer para ser</li>
            <li>Exercícios personalizados de meditação em todas as mentorias</li>
          </ul>
          <div className="meditation-price">
            <strong>R$ 890 à vista</strong>
            <span>ou 2x de R$ 445</span>
          </div>
          <a className="pill meditation-cta" href={whatsappLinks.meditation}>Comprar meditação</a>
        </div>
      </section>
    </main>
  );
}
