import PageHead from '../components/PageHead.jsx';
import { asset, whatsappLinks } from '../data/site.js';

const packages = [
  {
    image: 'photo-mentoria-luz.png',
    alt: 'Mulher segurando um livro',
    title: 'Mentoria Individual (Pacote Mensal) + Salto Quântico',
    sessions: '4 sessões online individuais de 1 hora',
    items: ['Meditação de conexão interna em todas as sessões', 'Identificação e liberação de crenças limitantes', 'Clareza em relação aos desejos e objetivos', 'Guia prático de rotina: fazer para ser'],
    price: 'R$ 890 à vista ou 2x de R$ 445',
  },
  {
    image: 'photo-mentoria-iluminada.png',
    alt: 'Vestido verde com bordados',
    title: 'Mentoria Individual (2 Meses) + Salto Quântico',
    sessions: '8 sessões online individuais de 1 hora',
    items: ['Meditações guiadas de conexão interna', 'Reestruturação de pensamentos e desbloqueio emocional', 'Novas perspectivas para a relação consigo mesma', 'Mapa pessoal interno de autoconhecimento'],
    price: 'R$ 1.690 à vista ou 4x de R$ 422,50',
  },
];

export default function Mentoria() {
  return (
    <main>
      <PageHead className="photo-head mentoria-head" title="Um caminho para a transformação">
        Descubra quem você realmente é e como agir para ressoar a sua verdadeira essência.
      </PageHead>
      <section className="packages blush">
        {packages.map((item) => (
          <article key={item.title}>
            <img src={asset(item.image)} alt={item.alt} />
            <div className="package-card">
              <h2>{item.title}</h2>
              <p>{item.sessions}</p>
              <ul>{item.items.map((text) => <li key={text}>{text}</li>)}</ul>
              <strong>{item.price}</strong>
              <a className="pill pink" href={whatsappLinks.mentoring}>Quero começar</a>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
