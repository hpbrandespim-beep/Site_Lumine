import CardGrid from '../components/CardGrid.jsx';
import PageHead from '../components/PageHead.jsx';

export default function Conteudo() {
  return (
    <main>
      <PageHead className="black clean-head" title="Conteúdo orgânico">
        Podcast, YouTube e conversas para acompanhar reflexões e práticas de autoconhecimento.
      </PageHead>
      <CardGrid className="sage visual-cards compact" items={[
        { href: 'https://linktr.ee/lumine.se', title: 'Podcast', text: 'Episódios e links atualizados reunidos no perfil da Lumine.' },
        { href: 'https://www.youtube.com/@lunabmachado', title: 'YouTube', text: 'Vídeos, meditações e conversas guiadas.' },
        { href: 'https://tiktok.com/@ilumine.luna', title: 'TikTok', text: 'Conteúdos curtos para acompanhar a rotina e as práticas.' },
      ]} />
    </main>
  );
}
