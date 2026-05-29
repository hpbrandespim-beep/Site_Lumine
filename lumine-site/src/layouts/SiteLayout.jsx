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
    : { href: whatsappLinks.general, label: 'Fale pelo whatsapp' };

  useEffect(() => {
    if (!hash) return;

    const target = document.querySelector(hash);
    if (target) target.scrollIntoView({ block: 'start' });
  }, [hash, pathname]);

  return (
    <>
      <header className="site-header">
        <NavLink className="brand" to="/index.html">Lumine Club</NavLink>
        <nav aria-label="Menu principal">
          {navigation.map((item) => (
            <NavLink key={item.to} to={item.to}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <Outlet />

      <footer id="footer" className="footer">
        <div className="footer-copy">
          <h2>Fale com a gente</h2>
          <p>@lunabmachado<br />@lumineclub_</p>
        </div>
        <div className="footer-actions">
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
