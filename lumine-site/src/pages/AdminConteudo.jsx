import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  defaultSiteContent,
  loadSiteContent,
  normalizeSiteContent,
  resetSiteContent,
  saveSiteContent,
} from '../data/content.js';

const ADMIN_AUTH_KEY = 'lumine-content-admin-auth';
const ADMIN_PASSWORD = 'lumine2026';

const contentGroups = [
  {
    title: 'Hero principal',
    description: 'Primeiro bloco que aparece na home.',
    fields: [
      ['home.hero.kicker', 'Etiqueta', 'input'],
      ['home.hero.title', 'Título', 'textarea'],
      ['home.hero.body', 'Texto', 'textarea'],
      ['home.hero.cta', 'Botão', 'input'],
    ],
  },
  {
    title: 'Transformação',
    description: 'Bloco logo depois da abertura.',
    fields: [
      ['home.transformation.eyebrow', 'Etiqueta', 'input'],
      ['home.transformation.title', 'Título', 'input'],
      ['home.transformation.body', 'Texto', 'textarea'],
      ['home.transformation.cta', 'Botão', 'input'],
    ],
  },
  {
    title: 'Luna',
    description: 'Texto de apresentação e botão da história.',
    fields: [
      ['home.luna.eyebrow', 'Etiqueta', 'input'],
      ['home.luna.title', 'Título', 'textarea'],
      ['home.luna.body', 'Texto', 'textarea'],
      ['home.luna.storyOpenLabel', 'Botão fechado', 'input'],
      ['home.luna.storyCloseLabel', 'Botão aberto', 'input'],
    ],
  },
  {
    title: 'Minha história',
    description: 'Texto que aparece no modal da história.',
    fields: [
      ['home.story.title', 'Título', 'input'],
      ['home.story.paragraphs.0', 'Parágrafo 1', 'textarea'],
      ['home.story.paragraphs.1', 'Parágrafo 2', 'textarea'],
    ],
  },
  {
    title: 'Meditação',
    description: 'Chamada do bloco de meditação na home.',
    fields: [
      ['home.meditation.eyebrow', 'Etiqueta', 'input'],
      ['home.meditation.title', 'Título', 'textarea'],
      ['home.meditation.body', 'Texto', 'textarea'],
      ['home.meditation.cta', 'Botão', 'input'],
    ],
  },
  {
    title: 'Perguntas frequentes',
    description: 'Perguntas do final da home.',
    fields: [
      ['home.faq.title', 'Título da seção', 'input'],
      ['home.faq.items.0.title', 'Pergunta 1', 'input'],
      ['home.faq.items.0.body', 'Resposta 1', 'textarea'],
      ['home.faq.items.1.title', 'Pergunta 2', 'input'],
      ['home.faq.items.1.body', 'Resposta 2', 'textarea'],
      ['home.faq.items.2.title', 'Pergunta 3', 'input'],
      ['home.faq.items.2.body', 'Resposta 3', 'textarea'],
    ],
  },
];

function getValue(source, path) {
  return path.split('.').reduce((value, key) => value?.[key], source) || '';
}

function setValue(source, path, value) {
  const keys = path.split('.');
  const copy = JSON.parse(JSON.stringify(source));
  let target = copy;

  keys.slice(0, -1).forEach((key) => {
    target = target[key];
  });

  target[keys[keys.length - 1]] = value;
  return copy;
}

export default function AdminConteudo() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => window.localStorage.getItem(ADMIN_AUTH_KEY) === 'true');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [content, setContent] = useState(() => loadSiteContent());
  const [importValue, setImportValue] = useState('');
  const [message, setMessage] = useState('');
  const exportValue = useMemo(() => JSON.stringify(content, null, 2), [content]);

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

  function updateField(path, value) {
    setContent((current) => setValue(current, path, value));
    setMessage('');
  }

  function handleSave(event) {
    event.preventDefault();
    saveSiteContent(content);
    setMessage('Conteúdo salvo. A home já usa esses textos.');
  }

  function handleReset() {
    resetSiteContent();
    setContent(defaultSiteContent);
    setImportValue('');
    setMessage('Conteúdo restaurado para o padrão.');
  }

  function handleImport() {
    try {
      const nextContent = normalizeSiteContent(JSON.parse(importValue));
      setContent(nextContent);
      saveSiteContent(nextContent);
      setMessage('Conteúdo importado e salvo.');
    } catch {
      setMessage('JSON inválido. Confira o texto importado.');
    }
  }

  if (!isLoggedIn) {
    return (
      <main className="admin-events-page admin-content-page">
        <section className="admin-login-card">
          <p className="kicker">Área Lumine</p>
          <h1>Editar conteúdo</h1>
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
    <main className="admin-events-page admin-content-page">
      <section className="admin-events-shell">
        <header className="admin-events-head">
          <div>
            <p className="kicker">Área Lumine</p>
            <h1>Conteúdo</h1>
            <p>Edite textos principais da home sem abrir o código. As alterações ficam salvas neste navegador.</p>
          </div>
          <div className="admin-head-actions">
            <Link className="event-admin-link" to="/index.html">Ver home</Link>
            <Link className="event-admin-link" to="/admin-eventos.html">Eventos</Link>
            <button type="button" className="event-admin-link" onClick={handleLogout}>Sair</button>
          </div>
        </header>

        <div className="admin-content-grid">
          <form className="admin-event-form admin-content-form" onSubmit={handleSave}>
            {contentGroups.map((group) => (
              <fieldset key={group.title} className="admin-content-group">
                <legend>{group.title}</legend>
                <p>{group.description}</p>

                {group.fields.map(([path, label, type]) => (
                  <label key={path}>
                    {label}
                    {type === 'textarea' ? (
                      <textarea
                        value={getValue(content, path)}
                        onChange={(event) => updateField(path, event.target.value)}
                      />
                    ) : (
                      <input
                        value={getValue(content, path)}
                        onChange={(event) => updateField(path, event.target.value)}
                      />
                    )}
                  </label>
                ))}
              </fieldset>
            ))}

            <div className="admin-content-actions">
              <button className="pill pink" type="submit">Salvar textos</button>
              <button className="event-admin-link" type="button" onClick={handleReset}>Restaurar padrão</button>
            </div>
            {message && <p className="admin-form-note">{message}</p>}
          </form>

          <aside className="admin-event-preview admin-content-preview">
            <p className="kicker">Prévia</p>
            <article>
              <span>{content.home.hero.kicker}</span>
              <h2>{content.home.hero.title}</h2>
              <p>{content.home.hero.body}</p>
              <strong>{content.home.hero.cta}</strong>
            </article>
            <article>
              <span>{content.home.luna.eyebrow}</span>
              <h3>{content.home.luna.title}</h3>
              <p>{content.home.story.paragraphs[0]}</p>
            </article>
            <div className="admin-content-json">
              <label>
                Exportar JSON
                <textarea value={exportValue} readOnly />
              </label>
              <label>
                Importar JSON
                <textarea
                  value={importValue}
                  onChange={(event) => setImportValue(event.target.value)}
                  placeholder="Cole aqui um JSON exportado"
                />
              </label>
              <button className="event-admin-link" type="button" onClick={handleImport}>Importar e salvar</button>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
