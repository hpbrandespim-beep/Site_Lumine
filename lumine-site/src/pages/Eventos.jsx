import { useMemo, useState } from 'react';
import { eventCategories, eventOptions, getEventCategory } from '../data/events.js';
import { loadCustomEvents, loadHiddenEventIds } from '../data/eventStorage.js';
import { asset, waitlistFormLink } from '../data/site.js';

function resolveImage(image, fallback) {
  if (!image) return asset(fallback);
  if (image.startsWith('data:') || image.startsWith('http') || image.startsWith('/')) return image;
  return asset(image);
}

export default function Eventos() {
  const [activeCategory, setActiveCategory] = useState(null);
  const customEvents = useMemo(() => loadCustomEvents(), []);
  const hiddenEventIds = useMemo(() => loadHiddenEventIds(), []);
  const allEvents = useMemo(() => {
    const visibleBaseEvents = eventOptions.filter((item) => !hiddenEventIds.includes(item.id));
    return [...visibleBaseEvents, ...customEvents];
  }, [customEvents, hiddenEventIds]);
  const selectedCategory = activeCategory ? getEventCategory(activeCategory) : null;
  const selectedEvents = activeCategory
    ? allEvents.filter((item) => item.category === activeCategory)
    : [];

  return (
    <main className="events-page">
      <section className="events-hero">
        <div>
          <p className="kicker">Agenda Lumine</p>
          <h1>Escolha o tipo de encontro que combina com seu momento.</h1>
          <p>Vivências para encontros mais próximos. Retiros e viagens para pausas mais profundas.</p>
        </div>
      </section>

      <section className="event-discovery" aria-label="Explorar eventos por categoria">
        {!activeCategory && (
          <>
            <div className="event-category-intro">
              <div>
                <p className="kicker">Categorias</p>
                <h2>Por onde você quer começar?</h2>
              </div>
            </div>

            <div className="event-choice-grid">
              {eventCategories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  className="event-choice-card"
                  onClick={() => setActiveCategory(category.id)}
                >
                  <img src={asset(category.image)} alt="" loading="lazy" decoding="async" />
                  <span>{category.eyebrow}</span>
                  <strong>{category.title}</strong>
                  <p>{category.summary}</p>
                </button>
              ))}
            </div>
          </>
        )}

        {activeCategory && (
          <section className="event-category-block event-category-selected">
            <header className="event-category-head">
              <div>
                <button type="button" className="event-back light" onClick={() => setActiveCategory(null)}>
                  Voltar para categorias
                </button>
                <p className="kicker">{selectedCategory.eyebrow}</p>
                <h2>{selectedCategory.label}</h2>
              </div>
            </header>

            <div className="event-options-grid">
              {selectedEvents.map((item) => {
                const eventLink = item.link || waitlistFormLink;
                const image = resolveImage(item.image, selectedCategory.image);

                return (
                  <article key={item.id} className="event-option-card">
                    <img src={image} alt="" loading="lazy" decoding="async" />
                    <div className="event-option-copy">
                      <span>{item.location || selectedCategory.label}</span>
                      <h3>{item.title}</h3>
                      <p>{item.summary}</p>
                      <div className="event-option-actions">
                        <a className="pill small" href={eventLink} target="_blank" rel="noreferrer">Inscrição</a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {selectedEvents.length === 0 && (
              <p className="event-filter-empty">Nenhum evento cadastrado nessa categoria no momento.</p>
            )}
          </section>
        )}
      </section>
    </main>
  );
}
