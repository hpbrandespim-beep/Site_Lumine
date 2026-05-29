import { socials } from '../data/site.js';
import { InstagramIcon, TikTokIcon, YouTubeIcon } from './BrandIcons.jsx';

const icons = {
  instagram: InstagramIcon,
  tiktok: TikTokIcon,
  youtube: YouTubeIcon,
};

export default function SocialLinks({ label = 'Redes sociais', className = 'socials' }) {
  return (
    <div className={className} aria-label={label}>
      {socials.map((social) => {
        const Icon = icons[social.icon];

        return (
          <a
            key={social.label}
            className={`social-link ${social.className}`}
            href={social.href}
            aria-label={social.label}
            title={social.label}
            target="_blank"
            rel="noreferrer"
          >
            {Icon && <Icon />}
            <span className="sr-only">{social.label}</span>
          </a>
        );
      })}
    </div>
  );
}
