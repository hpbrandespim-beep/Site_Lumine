import CardGrid from '../components/CardGrid.jsx';
import PageHead from '../components/PageHead.jsx';
import { asset } from '../data/site.js';

export default function Servicos() {
  return (
    <main>
      <PageHead className="services-head photo-head" title="Serviços">
        Caminhos diferentes para momentos diferentes: mentoria, meditação, vivências e propostas para empresas.
      </PageHead>
      <CardGrid
        className="sage visual-cards"
        items={[
          { href: '/mentoria.html', image: asset('photo-mentoria-iluminada.png'), alt: 'Mentoria individual', title: 'Mentoria', text: 'Pacotes Luz e Iluminada para transformação individual.' },
          { href: '/meditacao.html', image: asset('photo-meditation.png'), alt: 'Meditação guiada', title: 'Meditação', text: 'Uma meditação guiada disponível para compra.' },
          { href: '/eventos.html', image: asset('photo-vivencia.png'), alt: 'Vivência presencial', title: 'Eventos', text: 'Vivências presenciais divididas por cidade.' },
          { href: '/b2b.html', image: asset('photo-retiro.png'), alt: 'Experiência de cuidado coletivo', title: 'B2B', text: 'Propostas de bem-estar para empresas e colaboradores.' },
        ]}
      />
    </main>
  );
}
