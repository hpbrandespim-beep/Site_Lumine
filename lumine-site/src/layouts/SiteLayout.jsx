import { useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { WhatsAppIcon } from '../components/BrandIcons.jsx';
import SocialLinks from '../components/SocialLinks.jsx';
import { navigation, whatsappLinks } from '../data/site.js';

export default function SiteLayout() {
  const { hash, pathname } = useLocation();
  const isCorporate = pathname.toLowerCase().includes('b2b');
  const whatsappCta = isCorporate
    ? { href: whatsappLinks.corporate, label: 'Solicitar proposta' }
    : { href: whatsappLinks.general, label: 'Falar pelo WhatsApp' };

  useEffect(() => {
    if (!hash) return;

    const target = document.querySelector(hash);
    if (target) target.scrollIntoView({ block: 'start' });
  }, [hash, pathname]);

  return (
    <>
      <header className="site-header">
        <NavLink className="brand" to="/index.html">Lumine</NavLink>
        <nav aria-label="Menu principal">
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
