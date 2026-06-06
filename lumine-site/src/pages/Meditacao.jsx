import { asset, whatsappLinks } from '../data/site.js';
import { useSiteContent } from '../hooks/useSiteContent.js';

export default function Meditacao() {
  const { meditationPage } = useSiteContent();

  return (
    <main className="meditation-page">
      <section className="meditation-paper-head" aria-label={meditationPage.ariaLabel}>
        <span className="sr-only">{meditationPage.intro}</span>
      </section>

      <section className="meditation-offer">
        <img src={asset('photo-mentoria-luz.png')} alt={meditationPage.imageAlt} />
        <div className="meditation-offer-card">
          <h1>{meditationPage.title}</h1>
          <p>{meditationPage.sessions}</p>
          <ul>
            {meditationPage.items.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <div className="meditation-price">
            <strong>{meditationPage.pricePrimary}</strong>
            <span>{meditationPage.priceSecondary}</span>
          </div>
          <a className="pill meditation-cta" href={whatsappLinks.meditation}>{meditationPage.cta}</a>
        </div>
      </section>
    </main>
  );
}
