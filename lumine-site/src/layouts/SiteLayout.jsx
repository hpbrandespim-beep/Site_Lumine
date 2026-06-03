import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { WhatsAppIcon } from '../components/BrandIcons.jsx';
import SocialLinks from '../components/SocialLinks.jsx';
import { navigation, whatsappLinks } from '../data/site.js';
import { trackPageView } from '../utils/analytics.js';

const defaultMeta = {
  title: 'Lumine | Autoconhecimento e presença',
  description: 'Mentorias, meditações, vivências e experiências para voltar para si com mais clareza, presença e verdade.',
  robots: 'index, follow',
};

const notFoundMeta = {
  title: 'Página não encontrada | Lumine',
  description: 'Essa página da Lumine não foi encontrada.',
  robots: 'noindex, follow',
};

const routeMeta = {
  '/index.html': defaultMeta,
  '/': defaultMeta,
  '/mentoria.html': {
    title: 'Mentoria | Lumine',
    description: 'Jornadas individuais de mentoria para mulheres que buscam clareza, presença e transformação interna.',
    robots: 'index, follow',
  },
  '/mentoria': {
    title: 'Mentoria | Lumine',
    description: 'Jornadas individuais de mentoria para mulheres que buscam clareza, presença e transformação interna.',
    robots: 'index, follow',
  },
  '/servicos.html': {
    title: 'Serviços | Lumine',
    description: 'Conheça os caminhos da Lumine: mentorias, vivências, meditação e propostas para empresas.',
    robots: 'index, follow',
  },
  '/servicos': {
    title: 'Serviços | Lumine',
    description: 'Conheça os caminhos da Lumine: mentorias, vivências, meditação e propostas para empresas.',
    robots: 'index, follow',
  },
  '/meditacao.html': {
    title: 'Meditação | Lumine',
    description: 'Práticas de meditação guiada para aquietar a mente, voltar ao corpo e cultivar presença no cotidiano.',
    robots: 'index, follow',
  },
  '/meditacao': {
    title: 'Meditação | Lumine',
    description: 'Práticas de meditação guiada para aquietar a mente, voltar ao corpo e cultivar presença no cotidiano.',
    robots: 'index, follow',
  },
  '/eventos.html': {
    title: 'Eventos | Lumine',
    description: 'Vivências, retiros e encontros presenciais da Lumine em diferentes cidades.',
    robots: 'index, follow',
  },
  '/eventos': {
    title: 'Eventos | Lumine',
    description: 'Vivências, retiros e encontros presenciais da Lumine em diferentes cidades.',
    robots: 'index, follow',
  },
  '/conteudo.html': {
    title: 'Blog | Lumine',
    description: 'Conteúdos da Lumine sobre autoconhecimento, presença, corpo e transformação interna.',
    robots: 'index, follow',
  },
  '/conteudo': {
    title: 'Blog | Lumine',
    description: 'Conteúdos da Lumine sobre autoconhecimento, presença, corpo e transformação interna.',
    robots: 'index, follow',
  },
  '/b2b.html': {
    title: 'Empresas | Lumine',
    description: 'Experiências e propostas da Lumine para empresas que desejam cuidar de pessoas de forma mais humana.',
    robots: 'index, follow',
  },
  '/b2b': {
    title: 'Empresas | Lumine',
    description: 'Experiências e propostas da Lumine para empresas que desejam cuidar de pessoas de forma mais humana.',
    robots: 'index, follow',
  },
  '/admin-eventos.html': {
    title: 'Área Lumine | Eventos',
    description: 'Painel interno de eventos da Lumine.',
    robots: 'noindex, nofollow',
  },
  '/admin-eventos': {
    title: 'Área Lumine | Eventos',
    description: 'Painel interno de eventos da Lumine.',
    robots: 'noindex, nofollow',
  },
};

function setMetaContent(selector, content) {
  let meta = document.querySelector(selector);

  if (!meta) {
    const metaMatch = selector.match(/^meta\[(name|property)="(.+)"\]$/);
    if (!metaMatch) return;

    meta = document.createElement('meta');
    meta.setAttribute(metaMatch[1], metaMatch[2]);
    document.head.appendChild(meta);
  }

  if (meta) meta.setAttribute('content', content);
}

export default function SiteLayout() {
  const { hash, pathname } = useLocation();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const isCorporate = pathname.toLowerCase().includes('b2b');
  const whatsappCta = isCorporate
    ? { href: whatsappLinks.corporate, label: 'Solicitar proposta' }
    : { href: whatsappLinks.general, label: 'Falar pelo WhatsApp' };

  useEffect(() => {
    const meta = routeMeta[pathname] || notFoundMeta;

    document.title = meta.title;
    setMetaContent('meta[name="description"]', meta.description);
    setMetaContent('meta[name="robots"]', meta.robots);
    setMetaContent('meta[property="og:title"]', meta.title);
    setMetaContent('meta[property="og:description"]', meta.description);
    setMetaContent('meta[name="twitter:title"]', meta.title);
    setMetaContent('meta[name="twitter:description"]', meta.description);
    trackPageView(`${pathname}${hash}`, meta.title);
  }, [hash, pathname]);

  useEffect(() => {
    if (!hash) return;

    const target = document.querySelector(hash);
    if (target) target.scrollIntoView({ block: 'start' });
  }, [hash, pathname]);

  useEffect(() => {
    setIsNavOpen(false);
  }, [pathname]);

  return (
    <>
      <header className={`site-header ${isNavOpen ? 'is-nav-open' : ''}`}>
        <NavLink className="brand" to="/index.html">Lumine</NavLink>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={isNavOpen}
          aria-controls="site-navigation"
          onClick={() => setIsNavOpen((current) => !current)}
        >
          <span>Menu</span>
          <i aria-hidden="true" />
        </button>
        <nav id="site-navigation" aria-label="Menu principal">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              className={({ isActive }) => (isActive ? 'is-active' : undefined)}
              to={item.to}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <Outlet />

      <footer id="footer" className="footer">
        <div className="footer-copy">
          <p className="footer-kicker">Contato</p>
          <h2>Fale com a gente</h2>
          <p className="footer-description">Para dúvidas, agenda e propostas, escolha o canal que fizer mais sentido.</p>
          <p className="footer-handles">
            <span>@lunabmachado</span>
            <span>@lumineclub_</span>
          </p>
          <NavLink className="footer-admin-link" to="/admin-eventos.html">Área Lumine</NavLink>
        </div>
        <div className="footer-actions" aria-label="Canais de contato">
          <SocialLinks className="socials footer-socials" />
          <a className="outline whatsapp-link footer-whatsapp" href={whatsappCta.href}>
            <WhatsAppIcon />
            <span>{whatsappCta.label}</span>
          </a>
        </div>
      </footer>
    </>
  );
}
