import AgendamentoSection from '../components/AgendamentoSection.jsx';
import CardGrid from '../components/CardGrid.jsx';
import PageHead from '../components/PageHead.jsx';
import { whatsappLinks } from '../data/site.js';

export default function B2B() {
  return (
    <main className="b2b-page refined-page">
      <PageHead className="soft-head b2b-refined-head" title="Bem-estar para empresas">
        Propostas para empresas que desejam cuidar da saúde emocional, presença e união dos colaboradores.
      </PageHead>
      <CardGrid
        className="blush refined-cards b2b-refined-cards"
        items={[
          { href: whatsappLinks.corporate, title: 'Palestras', text: 'Encontros sobre presença, autocuidado e clareza emocional.' },
          { href: whatsappLinks.corporate, title: 'Workshop', text: 'Encontros práticos e personalizados para equipes.' },
        ]}
      />
      <AgendamentoSection />
    </main>
  );
}
