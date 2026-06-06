import AgendamentoSection from '../components/AgendamentoSection.jsx';
import CardGrid from '../components/CardGrid.jsx';
import PageHead from '../components/PageHead.jsx';
import { whatsappLinks } from '../data/site.js';
import { useSiteContent } from '../hooks/useSiteContent.js';

export default function B2B() {
  const { corporate } = useSiteContent();

  return (
    <main className="b2b-page refined-page">
      <PageHead className="soft-head b2b-refined-head" title={corporate.hero.title}>
        {corporate.hero.body}
      </PageHead>
      <CardGrid
        className="blush refined-cards b2b-refined-cards"
        items={corporate.cards.map((item) => ({ href: whatsappLinks.corporate, ...item }))}
      />
      <AgendamentoSection />
    </main>
  );
}
