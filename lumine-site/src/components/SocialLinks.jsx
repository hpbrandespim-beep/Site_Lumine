import { socials } from '../data/site.js';
import { EmailIcon, InstagramIcon, TikTokIcon } from './BrandIcons.jsx';

const icons = {
  email: EmailIcon,
  instagram: InstagramIcon,
  tiktok: TikTokIcon,
};

export default function SocialLinks({ label = 'Redes sociais', className = 'socials' }) {
  return (
    <div className={className} aria-label={label}>
      {socials.map((social) => {
        const Icon = icons[social.icon];
        const opensNewTab = /^(https?:|mailto:)/.test(social.href);

        return (
          <a
            key={social.label}
            className={`social-link ${social.className}`}
            href={social.href}
            aria-label={social.label}
            title={social.label}
            target={opensNewTab ? '_blank' : undefined}
            rel={opensNewTab ? 'noreferrer' : undefined}
          >
            {Icon && <Icon />}
            <span className="sr-only">{social.label}</span>
          </a>
        );
      })}
    </div>
  );
}
