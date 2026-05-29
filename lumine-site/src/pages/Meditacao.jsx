import PageHead from '../components/PageHead.jsx';
import { asset, whatsappLinks } from '../data/site.js';

export default function Meditacao() {
  return (
    <main>
      <PageHead className="soft-head" title="Meditação de conexão interna">
        Aprenda a usar sua respiração como ponto de calma em situações que te vulnerabilizam.
      </PageHead>
      <section className="meditation-block">
        <img src={asset('photo-meditation.png')} alt="Mulher meditando em grupo" />
        <div>
          <p className="eyebrow">Prática guiada</p>
          <h2>Volte para si em poucos minutos.</h2>
          <p>Uma meditação para comprar, guardar e repetir sempre que precisar de presença, clareza e acolhimento.</p>
          <a className="pill" href={whatsappLinks.meditation}>Comprar meditação</a>
        </div>
      </section>
    </main>
  );
}
