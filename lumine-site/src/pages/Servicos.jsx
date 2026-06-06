import CardGrid from '../components/CardGrid.jsx';
import PageHead from '../components/PageHead.jsx';
import { asset } from '../data/site.js';
import { useSiteContent } from '../hooks/useSiteContent.js';

const serviceCardMeta = [
  { href: '/mentoria.html', image: asset('photo-mentoria-iluminada.png') },
  { href: '/meditacao.html', image: asset('photo-meditation.png') },
  { href: '/eventos.html', image: asset('photo-vivencia.png') },
  { href: '/b2b.html', image: asset('photo-retiro.png') },
];

export default function Servicos() {
  const { services } = useSiteContent();

  return (
    <main>
      <PageHead className="services-head photo-head" title={services.hero.title}>
        {services.hero.body}
      </PageHead>
      <CardGrid
        className="sage visual-cards"
        items={services.cards.map((item, index) => ({
          ...serviceCardMeta[index % serviceCardMeta.length],
          ...item,
        }))}
      />
    </main>
  );
}
