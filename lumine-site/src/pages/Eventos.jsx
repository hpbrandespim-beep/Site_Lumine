import CardGrid from '../components/CardGrid.jsx';
import PageHead from '../components/PageHead.jsx';
import { whatsappLinks } from '../data/site.js';

export default function Eventos() {
  return (
    <main>
      <PageHead className="soft-head" title="Quem cuida de você?">
        Escolha sua cidade para ver as próximas vivências e encontros da Lumine.
      </PageHead>
      <CardGrid className="blue city-cards" items={[
        { href: '#paranavai', title: 'Paranavaí', text: 'Vivências, rodas e encontros locais.' },
        { href: '#sao-paulo', title: 'São Paulo', text: 'Experiências presenciais e retiros urbanos.' },
      ]} />
      <section id="paranavai" className="event-list sage">
        <h2>Eventos em Paranavaí</h2>
        <p>Próximas datas em breve. Entre na lista para receber primeiro.</p>
        <a className="pill" href={whatsappLinks.events}>Entrar na lista</a>
      </section>
      <section id="sao-paulo" className="event-list blush">
        <h2>Eventos em São Paulo</h2>
        <p>Próximas datas em breve. Entre na lista para receber primeiro.</p>
        <a className="pill pink" href={whatsappLinks.events}>Entrar na lista</a>
      </section>
    </main>
  );
}
