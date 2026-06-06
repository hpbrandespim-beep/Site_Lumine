import { useMemo, useState } from 'react';
import { eventCategories, eventOptions, getEventCategory } from '../data/events.js';
import { loadCustomEvents, loadHiddenEventIds } from '../data/eventStorage.js';
import { asset, waitlistFormLink } from '../data/site.js';
import { useSiteContent } from '../hooks/useSiteContent.js';

function resolveImage(image, fallback) {
  if (!image) return asset(fallback);
  if (image.startsWith('data:') || image.startsWith('http') || image.startsWith('/')) return image;
  return asset(image);
}

export default function Eventos() {
  const { eventsPage } = useSiteContent();
  const [activeCategory, setActiveCategory] = useState(null);
  const editableCategories = eventCategories.map((category, index) => ({
    ...category,
    ...(eventsPage.categories[index] || {}),
  }));
  const customEvents = useMemo(() => loadCustomEvents(), []);
  const hiddenEventIds = useMemo(() => loadHiddenEventIds(), []);
  const allEvents = useMemo(() => {
    const visibleBaseEvents = eventOptions.filter((item) => !hiddenEventIds.includes(item.id));
    const editableBaseEvents = visibleBaseEvents.map((item) => {
      const baseIndex = eventOptions.findIndex((baseItem) => baseItem.id === item.id);
      return {
        ...item,
        ...(eventsPage.baseEvents[baseIndex] || {}),
      };
    });

    return [...editableBaseEvents, ...customEvents];
  }, [customEvents, eventsPage.baseEvents, hiddenEventIds]);
  const selectedCategory = activeCategory
    ? editableCategories.find((item) => item.id === activeCategory) || getEventCategory(activeCategory)
    : null;
  const selectedEvents = activeCategory
    ? allEvents.filter((item) => item.category === activeCategory)
    : [];

  return (
    <main className="events-page">
      <section className="events-hero">
        <div>
          <p className="kicker">{eventsPage.hero.kicker}</p>
          <h1>{eventsPage.hero.title}</h1>
          <p>{eventsPage.hero.body}</p>
        </div>
      </section>

      <section className="event-discovery" aria-label={eventsPage.discoveryLabel}>
        {!activeCategory && (
          <>
            <div className="event-category-intro">
              <div>
                <p className="kicker">{eventsPage.intro.kicker}</p>
                <h2>{eventsPage.intro.title}</h2>
              </div>
            </div>

            <div className="event-choice-grid">
              {editableCategories.map((category) => (
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
                  {eventsPage.backLabel}
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
                        <a className="pill small" href={eventLink} target="_blank" rel="noreferrer">{eventsPage.signupLabel}</a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {selectedEvents.length === 0 && (
              <p className="event-filter-empty">{eventsPage.emptyMessage}</p>
            )}
          </section>
        )}
      </section>
    </main>
  );
}
