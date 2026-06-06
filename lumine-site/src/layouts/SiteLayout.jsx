import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { WhatsAppIcon } from '../components/BrandIcons.jsx';
import SocialLinks from '../components/SocialLinks.jsx';
import { navigation, whatsappLinks } from '../data/site.js';
import { useSiteContent } from '../hooks/useSiteContent.js';
import { trackPageView } from '../utils/analytics.js';

const routeMeta = {
  '/index.html': { source: 'default', robots: 'index, follow' },
  '/': { source: 'default', robots: 'index, follow' },
  '/mentoria.html': { source: 'mentoring', robots: 'index, follow' },
  '/mentoria': { source: 'mentoring', robots: 'index, follow' },
  '/servicos.html': { source: 'services', robots: 'index, follow' },
  '/servicos': { source: 'services', robots: 'index, follow' },
  '/meditacao.html': { source: 'meditation', robots: 'index, follow' },
  '/meditacao': { source: 'meditation', robots: 'index, follow' },
  '/eventos.html': { source: 'events', robots: 'index, follow' },
  '/eventos': { source: 'events', robots: 'index, follow' },
  '/conteudo.html': { source: 'blog', robots: 'index, follow' },
  '/conteudo': { source: 'blog', robots: 'index, follow' },
  '/b2b.html': { source: 'corporate', robots: 'index, follow' },
  '/b2b': { source: 'corporate', robots: 'index, follow' },
  '/admin.html': { source: 'admin', robots: 'noindex, nofollow' },
  '/admin': { source: 'admin', robots: 'noindex, nofollow' },
  '/admin-eventos.html': { source: 'admin', robots: 'noindex, nofollow' },
  '/admin-eventos': { source: 'admin', robots: 'noindex, nofollow' },
  '/admin-conteudo.html': { source: 'admin', robots: 'noindex, nofollow' },
  '/admin-conteudo': { source: 'admin', robots: 'noindex, nofollow' },
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

function getRouteMeta(pathname, seo) {
  const config = routeMeta[pathname];

  if (!config) {
    return {
      ...seo.notFound,
      robots: 'noindex, follow',
    };
  }

  const source = config.source === 'default'
    ? seo.default
    : seo.routes[config.source] || seo.default;

  return {
    ...source,
    robots: config.robots,
  };
}

export default function SiteLayout() {
  const { hash, pathname } = useLocation();
  const { layout, seo } = useSiteContent();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const isCorporate = pathname.toLowerCase().includes('b2b');
  const whatsappCta = isCorporate
    ? { href: whatsappLinks.corporate, label: layout.footer.corporateWhatsappLabel }
    : { href: whatsappLinks.general, label: layout.footer.generalWhatsappLabel };
  const navItems = navigation.map((item) => ({
    ...item,
    label: layout.nav[item.key] || item.label,
  }));

  useEffect(() => {
    const meta = getRouteMeta(pathname, seo);

    document.title = meta.title;
    setMetaContent('meta[name="description"]', meta.description);
    setMetaContent('meta[name="robots"]', meta.robots);
    setMetaContent('meta[property="og:title"]', meta.title);
    setMetaContent('meta[property="og:description"]', meta.description);
    setMetaContent('meta[name="twitter:title"]', meta.title);
    setMetaContent('meta[name="twitter:description"]', meta.description);
    trackPageView(`${pathname}${hash}`, meta.title);
  }, [hash, pathname, seo]);

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
        <NavLink className="brand" to="/index.html">{layout.brand}</NavLink>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={isNavOpen}
          aria-controls="site-navigation"
          onClick={() => setIsNavOpen((current) => !current)}
        >
          <span>{layout.menuLabel}</span>
          <i aria-hidden="true" />
        </button>
        <nav id="site-navigation" aria-label={layout.navLabel}>
          {navItems.map((item) => (
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
          <p className="footer-kicker">{layout.footer.kicker}</p>
          <h2>{layout.footer.title}</h2>
          <p className="footer-description">{layout.footer.description}</p>
          <p className="footer-handles">
            {layout.footer.handles.map((handle) => <span key={handle}>{handle}</span>)}
          </p>
          <NavLink className="footer-admin-link" to="/admin.html">{layout.footer.adminLabel}</NavLink>
        </div>
        <div className="footer-actions" aria-label={layout.footer.channelsLabel}>
          <SocialLinks className="socials footer-socials" label={layout.footer.socialsLabel} labels={layout.socials} />
          <a className="outline whatsapp-link footer-whatsapp" href={whatsappCta.href}>
            <WhatsAppIcon />
            <span>{whatsappCta.label}</span>
          </a>
        </div>
      </footer>
    </>
  );
}
