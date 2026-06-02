import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { eventCategories, eventOptions, getEventCategory } from '../data/events.js';
import {
  createEventId,
  loadCustomEvents,
  loadHiddenEventIds,
  saveCustomEvents,
  saveHiddenEventIds,
} from '../data/eventStorage.js';
import { asset, waitlistFormLink } from '../data/site.js';

const ADMIN_AUTH_KEY = 'lumine-events-admin-auth';
const ADMIN_PASSWORD = 'lumine2026';

const initialForm = {
  category: 'vivencias',
  title: '',
  location: '',
  summary: '',
  link: '',
  image: '',
};

function resolveImage(image, fallback) {
  if (!image) return asset(fallback);
  if (image.startsWith('data:') || image.startsWith('http') || image.startsWith('/')) return image;
  return asset(image);
}

export default function AdminEventos() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => window.localStorage.getItem(ADMIN_AUTH_KEY) === 'true');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [form, setForm] = useState(initialForm);
  const [customEvents, setCustomEvents] = useState(() => loadCustomEvents());
  const [hiddenEventIds, setHiddenEventIds] = useState(() => loadHiddenEventIds());
  const previewCategory = getEventCategory(form.category);
  const visibleBaseEvents = useMemo(() => (
    eventOptions.filter((item) => !hiddenEventIds.includes(item.id))
  ), [hiddenEventIds]);
  const hiddenBaseEvents = useMemo(() => (
    eventOptions.filter((item) => hiddenEventIds.includes(item.id))
  ), [hiddenEventIds]);
  const groupedCustomEvents = useMemo(() => (
    eventCategories.map((category) => ({
      ...category,
      items: customEvents.filter((item) => item.category === category.id),
    }))
  ), [customEvents]);
  const activeEvents = useMemo(() => [
    ...visibleBaseEvents.map((item) => ({ ...item, source: 'Base do site', sourceType: 'base' })),
    ...customEvents.map((item) => ({ ...item, source: 'Criado no painel', sourceType: 'custom' })),
  ], [customEvents, visibleBaseEvents]);
  const groupedActiveEvents = useMemo(() => (
    eventCategories.map((category) => ({
      ...category,
      items: activeEvents.filter((item) => item.category === category.id),
    }))
  ), [activeEvents]);

  function handleLogin(event) {
    event.preventDefault();
    if (password.trim() !== ADMIN_PASSWORD) {
      setLoginError('Senha incorreta.');
      return;
    }

    window.localStorage.setItem(ADMIN_AUTH_KEY, 'true');
    setIsLoggedIn(true);
    setLoginError('');
  }

  function handleLogout() {
    window.localStorage.removeItem(ADMIN_AUTH_KEY);
    setIsLoggedIn(false);
    setPassword('');
  }

  function updateForm(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleCoverFile(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      updateForm('image', String(reader.result || ''));
    };
    reader.readAsDataURL(file);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const newEvent = {
      id: createEventId(),
      category: form.category,
      title: form.title.trim(),
      location: form.location.trim(),
      summary: form.summary.trim(),
      link: form.link.trim(),
      image: form.image.trim(),
    };

    if (!newEvent.title || !newEvent.summary || !newEvent.link) return;

    const nextEvents = [newEvent, ...customEvents];
    setCustomEvents(nextEvents);
    saveCustomEvents(nextEvents);
    setForm(initialForm);
  }

  function handleDelete(eventId) {
    const nextEvents = customEvents.filter((item) => item.id !== eventId);
    setCustomEvents(nextEvents);
    saveCustomEvents(nextEvents);
  }

  function handleRemoveActiveEvent(item) {
    if (item.sourceType === 'custom') {
      handleDelete(item.id);
      return;
    }

    const nextHiddenEventIds = Array.from(new Set([...hiddenEventIds, item.id]));
    setHiddenEventIds(nextHiddenEventIds);
    saveHiddenEventIds(nextHiddenEventIds);
  }

  function handleRestoreBaseEvent(eventId) {
    const nextHiddenEventIds = hiddenEventIds.filter((itemId) => itemId !== eventId);
    setHiddenEventIds(nextHiddenEventIds);
    saveHiddenEventIds(nextHiddenEventIds);
  }

  if (!isLoggedIn) {
    return (
      <main className="admin-events-page">
        <section className="admin-login-card">
          <p className="kicker">Área Lumine</p>
          <h1>Entrar no painel</h1>
          <form onSubmit={handleLogin}>
            <label>
              Senha
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Digite a senha"
              />
            </label>
            {loginError && <p className="admin-form-note error">{loginError}</p>}
            <button className="pill" type="submit">Entrar</button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="admin-events-page">
      <section className="admin-events-shell">
        <header className="admin-events-head">
          <div>
            <p className="kicker">Área Lumine</p>
            <h1>Eventos</h1>
            <p>Cadastre uma capa, título, descrição e o link de inscrição do Sympla para aparecer na página pública.</p>
          </div>
          <div className="admin-head-actions">
            <Link className="event-admin-link" to="/eventos.html">Ver página</Link>
            <button type="button" className="event-admin-link" onClick={handleLogout}>Sair</button>
          </div>
        </header>

        <div className="admin-events-grid">
          <form className="admin-event-form" onSubmit={handleSubmit}>
            <label>
              Categoria
              <select value={form.category} onChange={(event) => updateForm('category', event.target.value)}>
                {eventCategories.map((category) => (
                  <option key={category.id} value={category.id}>{category.label}</option>
                ))}
              </select>
            </label>

            <label>
              Título
              <input
                value={form.title}
                onChange={(event) => updateForm('title', event.target.value)}
                placeholder="Nome do evento"
                required
              />
            </label>

            <label>
              Local
              <input
                value={form.location}
                onChange={(event) => updateForm('location', event.target.value)}
                placeholder="Cidade, espaço ou formato"
              />
            </label>

            <label>
              Descrição
              <textarea
                value={form.summary}
                onChange={(event) => updateForm('summary', event.target.value)}
                placeholder="Escreva uma descrição curta"
                required
              />
            </label>

            <label>
              Link de inscrição no Sympla
              <input
                type="url"
                value={form.link}
                onChange={(event) => updateForm('link', event.target.value)}
                placeholder="https://www.sympla.com.br/..."
                required
              />
            </label>

            <label>
              Capa
              <input type="file" accept="image/*" onChange={handleCoverFile} />
            </label>

            <label>
              Capa por link
              <input
                value={form.image.startsWith('data:') ? '' : form.image}
                onChange={(event) => updateForm('image', event.target.value)}
                placeholder="https://..."
              />
            </label>

            <button className="pill pink" type="submit">Salvar evento</button>
          </form>

          <aside className="admin-event-preview">
            <p className="kicker">Prévia</p>
            <article className="event-option-card">
              <img src={resolveImage(form.image, previewCategory.image)} alt="" />
              <div className="event-option-copy">
                <span>{form.location || previewCategory.label}</span>
                <h3>{form.title || 'Título do evento'}</h3>
                <p>{form.summary || 'A descrição do evento aparece aqui.'}</p>
              </div>
            </article>
          </aside>
        </div>

        <section className="admin-event-list">
          <header>
            <h2>Cadastrados</h2>
            <p>{customEvents.length} evento{customEvents.length === 1 ? '' : 's'} criado{customEvents.length === 1 ? '' : 's'} no painel</p>
          </header>

          {groupedCustomEvents.map((category) => (
            <div key={category.id} className="admin-event-group">
              <h3>{category.label}</h3>
              {category.items.length === 0 ? (
                <p className="admin-form-note">Nenhum evento nessa categoria.</p>
              ) : (
                <div className="admin-event-items">
                  {category.items.map((item) => (
                    <article key={item.id}>
                      <img src={resolveImage(item.image, category.image)} alt="" />
                      <div>
                        <span>{item.location || category.label}</span>
                        <strong>{item.title}</strong>
                        <p>{item.summary}</p>
                      </div>
                      <button type="button" onClick={() => handleDelete(item.id)}>Excluir</button>
                    </article>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="admin-default-note">
            <span>{eventOptions.length}</span>
            <p>eventos-base continuam no site como exemplo e podem ser trocados depois no código.</p>
          </div>
        </section>

        <section className="admin-event-list admin-active-events">
          <header>
            <h2>Eventos ativos no site</h2>
            <p>{activeEvents.length} evento{activeEvents.length === 1 ? '' : 's'} aparecendo na página pública</p>
          </header>

          {groupedActiveEvents.map((category) => (
            <div key={category.id} className="admin-event-group">
              <h3>{category.label}</h3>
              <div className="admin-event-items">
                {category.items.map((item) => {
                  const link = item.link || waitlistFormLink;

                  return (
                    <article key={`${item.source}-${item.id}`}>
                      <img src={resolveImage(item.image, category.image)} alt="" />
                      <div>
                        <span>{item.location || category.label} • {item.source}</span>
                        <strong>{item.title}</strong>
                        <p>{item.summary}</p>
                      </div>
                      <div className="admin-event-actions">
                        <a className="admin-event-open" href={link} target="_blank" rel="noreferrer">Abrir inscrição</a>
                        <button
                          type="button"
                          className="admin-event-remove"
                          onClick={() => handleRemoveActiveEvent(item)}
                        >
                          Excluir
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          ))}
        </section>

        {hiddenBaseEvents.length > 0 && (
          <section className="admin-event-list admin-removed-events">
            <header>
              <h2>Eventos removidos</h2>
              <p>{hiddenBaseEvents.length} evento{hiddenBaseEvents.length === 1 ? '' : 's'} fora da página pública</p>
            </header>

            <div className="admin-event-items">
              {hiddenBaseEvents.map((item) => {
                const category = getEventCategory(item.category);

                return (
                  <article key={item.id}>
                    <img src={resolveImage(item.image, category.image)} alt="" />
                    <div>
                      <span>{item.location || category.label} • Base do site</span>
                      <strong>{item.title}</strong>
                      <p>{item.summary}</p>
                    </div>
                    <button type="button" onClick={() => handleRestoreBaseEvent(item.id)}>Restaurar</button>
                  </article>
                );
              })}
            </div>
          </section>
        )}
      </section>
    </main>
  );
}
