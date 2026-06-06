import PageHead from '../components/PageHead.jsx';
import { asset, whatsappLinks } from '../data/site.js';
import { useSiteContent } from '../hooks/useSiteContent.js';

const packageMedia = [
  {
    image: 'photo-mentoria-luz.png',
  },
  {
    image: 'photo-mentoria-iluminada.png',
  },
];

export default function Mentoria() {
  const { mentoring } = useSiteContent();
  const packages = mentoring.packages.map((item, index) => ({
    ...packageMedia[index % packageMedia.length],
    ...item,
  }));

  return (
    <main>
      <PageHead className="photo-head mentoria-head" title={mentoring.hero.title}>
        {mentoring.hero.body}
      </PageHead>
      <section className="packages blush">
        {packages.map((item) => (
          <article key={item.title}>
            <img src={asset(item.image)} alt={item.alt} />
            <div className="package-card">
              <h2>{item.title}</h2>
              <p>{item.sessions}</p>
              <ul>{item.items.map((text) => <li key={text}>{text}</li>)}</ul>
              <strong>{item.price}</strong>
              <a className="pill pink" href={whatsappLinks.mentoring}>{mentoring.cta}</a>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
