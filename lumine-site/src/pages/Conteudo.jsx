import PageHead from '../components/PageHead.jsx';
import { asset } from '../data/site.js';

const blogPosts = [
  {
    title: 'Desacelerar para se Escutar',
    excerpt: 'Uma prática simples para sair do automático e voltar para o corpo.',
    image: 'testimonial-quiet.png',
    href: 'https://instagram.com/lumineclub_',
  },
  {
    title: 'O que a Presença Revela',
    excerpt: 'Quando você silencia o ruído, começa a perceber o que realmente importa.',
    image: 'photo-luna-outdoor.png',
    href: 'https://instagram.com/lumineclub_',
  },
  {
    title: 'Cuidar de Si sem Culpa',
    excerpt: 'Reflexões sobre limites, descanso e energia emocional no dia a dia.',
    image: 'photo-meditation.png',
    href: 'https://tiktok.com/@ilumine.luna',
  },
  {
    title: 'Corpo, Respiração e Clareza',
    excerpt: 'Como pequenas pausas ao longo do dia transformam sua percepção.',
    image: 'photo-vivencia.png',
    href: 'https://www.youtube.com/@lunabmachado',
  },
  {
    title: 'Rituais de Recomeço',
    excerpt: 'Sugestões de micro-rituais para reconexão em semanas intensas.',
    image: 'photo-retiro.png',
    href: 'https://instagram.com/lumineclub_',
  },
  {
    title: 'A Arte de Voltar para Si',
    excerpt: 'Um convite para criar espaços de verdade, presença e escuta interna.',
    image: 'testimonial-art.png',
    href: 'https://tiktok.com/@ilumine.luna',
  },
];

export default function Conteudo() {
  return (
    <main className="content-page blog-page refined-page">
      <PageHead className="black clean-head content-refined-head" title="Blog">
        Textos, reflexões e bastidores sobre autoconhecimento, presença e transformação.
      </PageHead>

      <section className="blog-shell">
        <header className="blog-shell-head">
          <p>Posts recentes</p>
          <h2>Reflexões para ler com calma</h2>
        </header>

        <div className="blog-grid">
          {blogPosts.map((post) => (
            <a key={post.title} className="blog-card" href={post.href} target="_blank" rel="noreferrer">
              <img src={asset(post.image)} alt="" />
              <div className="blog-card-copy">
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <span>Ler post →</span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
