export const asset = (name) => `/assets/${name}`;

export const whatsappLinks = {
  general: 'https://wa.me/5544984282600?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20a%20Lumine.',
  mentoring: 'https://wa.me/5544984282600?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20as%20mentorias%20da%20Lumine.',
  meditation: 'https://wa.me/5544984282600?text=Ol%C3%A1%2C%20gostaria%20de%20comprar%20a%20medita%C3%A7%C3%A3o%20da%20Lumine.',
  events: 'https://wa.me/5544984282600?text=Ol%C3%A1%2C%20quero%20entrar%20na%20lista%20dos%20eventos%20da%20Lumine.',
  corporate: 'https://wa.me/5544984282600?text=Ol%C3%A1%2C%20gostaria%20de%20uma%20proposta%20da%20Lumine%20para%20empresa.',
};

export const waitlistFormLink = 'https://docs.google.com/forms/d/e/1FAIpQLSdY1kbMgB5xgqM22mYmJ7-oHEiBYUvpJpXsKWkPRKeQZa-CzA/viewform';

export const navigation = [
  { key: 'mentoring', label: 'Mentoria', to: '/mentoria.html' },
  { key: 'services', label: 'Serviços', to: '/servicos.html' },
  { key: 'meditation', label: 'Meditação', to: '/meditacao.html' },
  { key: 'events', label: 'Eventos', to: '/eventos.html' },
  { key: 'blog', label: 'Blog', to: '/conteudo.html' },
  { key: 'corporate', label: 'Empresas', to: '/b2b.html' },
];

export const socials = [
  { key: 'instagram', label: 'Instagram', href: 'https://instagram.com/lumineclub_', className: 'icon-instagram', icon: 'instagram' },
  { key: 'tiktok', label: 'TikTok', href: 'https://tiktok.com/@ilumine.luna', className: 'icon-tiktok', icon: 'tiktok' },
  { key: 'email', label: 'E-mail', href: '/b2b.html#agendamento', className: 'icon-email', icon: 'email' },
];
