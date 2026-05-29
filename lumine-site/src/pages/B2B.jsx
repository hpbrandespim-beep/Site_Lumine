import CardGrid from '../components/CardGrid.jsx';
import PageHead from '../components/PageHead.jsx';
import { whatsappLinks } from '../data/site.js';

export default function B2B() {
  return (
    <main>
      <PageHead className="soft-head" title="Bem-estar para empresas">
        Propostas para empresas que desejam cuidar da saúde emocional, presença e união dos colaboradores.
      </PageHead>
      <CardGrid className="blush" items={[
        { href: whatsappLinks.corporate, title: 'Palestras', text: 'Encontros sobre presença, autocuidado e clareza emocional.' },
        { href: whatsappLinks.corporate, title: 'Vivências', text: 'Experiências em grupo para conexão e pertencimento.' },
        { href: whatsappLinks.corporate, title: 'Programas', text: 'Jornadas personalizadas para equipes.' },
      ]} />
    </main>
  );
}
