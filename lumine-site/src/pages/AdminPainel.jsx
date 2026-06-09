import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  defaultSiteContent,
  loadSiteContent,
  resetSiteContent,
  saveSiteContent,
} from '../data/content.js';
import { eventCategories, eventOptions, getEventCategory } from '../data/events.js';
import {
  createEventId,
  loadCustomEvents,
  loadHiddenEventIds,
  saveCustomEvents,
  saveHiddenEventIds,
} from '../data/eventStorage.js';
import { asset, waitlistFormLink } from '../data/site.js';

const ADMIN_AUTH_KEY = 'lumine-admin-auth';
const LEGACY_AUTH_KEYS = ['lumine-events-admin-auth', 'lumine-content-admin-auth'];
const ADMIN_PASSWORD = 'LumineAdm!29#Vida@2026';

const initialForm = {
  category: 'vivencias',
  title: '',
  location: '',
  summary: '',
  link: '',
  image: '',
};

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
      ['home.transformation.imageAlt', 'Texto alternativo da imagem', 'input'],
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
      ['home.luna.imageAlt', 'Texto alternativo da imagem', 'input'],
    ],
  },
  {
    title: 'Minha história',
    description: 'Texto que aparece no modal da história.',
    fields: [
      ['home.story.title', 'Título', 'input'],
      ['home.story.dialogLabel', 'Nome da janela', 'input'],
      ['home.story.closeButtonLabel', 'Botão fechar', 'input'],
      ['home.story.imageAlt', 'Texto alternativo da imagem', 'input'],
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
      ['home.meditation.imageAlt', 'Texto alternativo da imagem', 'input'],
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
  {
    title: 'Home - ofertas',
    description: 'Cards de caminhos que aparecem na home.',
    fields: [
      ['home.offers.items.0.title', 'Card 1 - título', 'input'],
      ['home.offers.items.0.text', 'Card 1 - texto', 'textarea'],
      ['home.offers.items.0.cta', 'Card 1 - botão', 'input'],
      ['home.offers.items.1.title', 'Card 2 - título', 'input'],
      ['home.offers.items.1.text', 'Card 2 - texto', 'textarea'],
      ['home.offers.items.1.cta', 'Card 2 - botão', 'input'],
      ['home.offers.items.2.title', 'Card 3 - título', 'input'],
      ['home.offers.items.2.text', 'Card 3 - texto', 'textarea'],
      ['home.offers.items.2.cta', 'Card 3 - botão', 'input'],
    ],
  },
  {
    title: 'Home - depoimentos',
    description: 'Título da seção e textos do carrossel de depoimentos.',
    fields: [
      ['home.testimonials.kicker', 'Etiqueta', 'input'],
      ['home.testimonials.title', 'Título', 'input'],
      ['home.testimonials.previousLabel', 'Seta anterior', 'input'],
      ['home.testimonials.nextLabel', 'Seta próxima', 'input'],
      ['home.testimonials.selectLabel', 'Selecionar depoimento', 'input'],
      ['home.testimonials.items.0.quote', 'Depoimento 1', 'textarea'],
      ['home.testimonials.items.0.author', 'Autor 1', 'input'],
      ['home.testimonials.items.0.alt', 'Depoimento 1 - texto alternativo', 'input'],
      ['home.testimonials.items.1.quote', 'Depoimento 2', 'textarea'],
      ['home.testimonials.items.1.author', 'Autor 2', 'input'],
      ['home.testimonials.items.1.alt', 'Depoimento 2 - texto alternativo', 'input'],
      ['home.testimonials.items.2.quote', 'Depoimento 3', 'textarea'],
      ['home.testimonials.items.2.author', 'Autor 3', 'input'],
      ['home.testimonials.items.2.alt', 'Depoimento 3 - texto alternativo', 'input'],
    ],
  },
  {
    title: 'Menu e rodapé',
    description: 'Textos globais que aparecem em todas as páginas.',
    fields: [
      ['layout.brand', 'Marca', 'input'],
      ['layout.menuLabel', 'Botão menu', 'input'],
      ['layout.navLabel', 'Legenda do menu', 'input'],
      ['layout.nav.mentoring', 'Menu - mentoria', 'input'],
      ['layout.nav.services', 'Menu - serviços', 'input'],
      ['layout.nav.meditation', 'Menu - meditação', 'input'],
      ['layout.nav.events', 'Menu - eventos', 'input'],
      ['layout.nav.blog', 'Menu - blog', 'input'],
      ['layout.nav.corporate', 'Menu - empresas', 'input'],
      ['layout.socials.instagram', 'Social - Instagram', 'input'],
      ['layout.socials.tiktok', 'Social - TikTok', 'input'],
      ['layout.socials.email', 'Social - e-mail', 'input'],
      ['layout.footer.kicker', 'Rodapé - etiqueta', 'input'],
      ['layout.footer.title', 'Rodapé - título', 'input'],
      ['layout.footer.description', 'Rodapé - texto', 'textarea'],
      ['layout.footer.handles.0', 'Perfil 1', 'input'],
      ['layout.footer.handles.1', 'Perfil 2', 'input'],
      ['layout.footer.adminLabel', 'Link admin', 'input'],
      ['layout.footer.generalWhatsappLabel', 'WhatsApp geral', 'input'],
      ['layout.footer.corporateWhatsappLabel', 'WhatsApp empresas', 'input'],
      ['layout.footer.channelsLabel', 'Legenda canais', 'input'],
      ['layout.footer.socialsLabel', 'Legenda redes sociais', 'input'],
    ],
  },
  {
    title: 'SEO',
    description: 'Títulos e descrições usados na aba do navegador e nos compartilhamentos.',
    fields: [
      ['seo.default.title', 'Home - título SEO', 'input'],
      ['seo.default.description', 'Home - descrição SEO', 'textarea'],
      ['seo.routes.mentoring.title', 'Mentoria - título SEO', 'input'],
      ['seo.routes.mentoring.description', 'Mentoria - descrição SEO', 'textarea'],
      ['seo.routes.services.title', 'Serviços - título SEO', 'input'],
      ['seo.routes.services.description', 'Serviços - descrição SEO', 'textarea'],
      ['seo.routes.meditation.title', 'Meditação - título SEO', 'input'],
      ['seo.routes.meditation.description', 'Meditação - descrição SEO', 'textarea'],
      ['seo.routes.events.title', 'Eventos - título SEO', 'input'],
      ['seo.routes.events.description', 'Eventos - descrição SEO', 'textarea'],
      ['seo.routes.blog.title', 'Blog - título SEO', 'input'],
      ['seo.routes.blog.description', 'Blog - descrição SEO', 'textarea'],
      ['seo.routes.corporate.title', 'Empresas - título SEO', 'input'],
      ['seo.routes.corporate.description', 'Empresas - descrição SEO', 'textarea'],
      ['seo.notFound.title', '404 - título SEO', 'input'],
      ['seo.notFound.description', '404 - descrição SEO', 'textarea'],
    ],
  },
  {
    title: 'Serviços',
    description: 'Cabeçalho e cards da página de serviços.',
    fields: [
      ['services.hero.title', 'Título', 'input'],
      ['services.hero.body', 'Texto', 'textarea'],
      ['services.cards.0.title', 'Card 1 - título', 'input'],
      ['services.cards.0.text', 'Card 1 - texto', 'textarea'],
      ['services.cards.0.alt', 'Card 1 - texto alternativo', 'input'],
      ['services.cards.1.title', 'Card 2 - título', 'input'],
      ['services.cards.1.text', 'Card 2 - texto', 'textarea'],
      ['services.cards.1.alt', 'Card 2 - texto alternativo', 'input'],
      ['services.cards.2.title', 'Card 3 - título', 'input'],
      ['services.cards.2.text', 'Card 3 - texto', 'textarea'],
      ['services.cards.2.alt', 'Card 3 - texto alternativo', 'input'],
      ['services.cards.3.title', 'Card 4 - título', 'input'],
      ['services.cards.3.text', 'Card 4 - texto', 'textarea'],
      ['services.cards.3.alt', 'Card 4 - texto alternativo', 'input'],
    ],
  },
  {
    title: 'Mentoria',
    description: 'Cabeçalho, pacotes, listas e preços da página de mentoria.',
    fields: [
      ['mentoring.hero.title', 'Título', 'input'],
      ['mentoring.hero.body', 'Texto', 'textarea'],
      ['mentoring.cta', 'Botão', 'input'],
      ['mentoring.packages.0.title', 'Pacote 1 - título', 'textarea'],
      ['mentoring.packages.0.alt', 'Pacote 1 - texto alternativo', 'input'],
      ['mentoring.packages.0.sessions', 'Pacote 1 - sessões', 'input'],
      ['mentoring.packages.0.items.0', 'Pacote 1 - item 1', 'input'],
      ['mentoring.packages.0.items.1', 'Pacote 1 - item 2', 'input'],
      ['mentoring.packages.0.items.2', 'Pacote 1 - item 3', 'input'],
      ['mentoring.packages.0.items.3', 'Pacote 1 - item 4', 'input'],
      ['mentoring.packages.0.price', 'Pacote 1 - preço', 'input'],
      ['mentoring.packages.1.title', 'Pacote 2 - título', 'textarea'],
      ['mentoring.packages.1.alt', 'Pacote 2 - texto alternativo', 'input'],
      ['mentoring.packages.1.sessions', 'Pacote 2 - sessões', 'input'],
      ['mentoring.packages.1.items.0', 'Pacote 2 - item 1', 'input'],
      ['mentoring.packages.1.items.1', 'Pacote 2 - item 2', 'input'],
      ['mentoring.packages.1.items.2', 'Pacote 2 - item 3', 'input'],
      ['mentoring.packages.1.items.3', 'Pacote 2 - item 4', 'input'],
      ['mentoring.packages.1.price', 'Pacote 2 - preço', 'input'],
    ],
  },
  {
    title: 'Meditação',
    description: 'Textos da página de meditação.',
    fields: [
      ['meditationPage.ariaLabel', 'Nome acessível', 'input'],
      ['meditationPage.intro', 'Texto oculto de introdução', 'textarea'],
      ['meditationPage.imageAlt', 'Texto alternativo da imagem', 'input'],
      ['meditationPage.title', 'Título', 'input'],
      ['meditationPage.sessions', 'Sessões', 'input'],
      ['meditationPage.items.0', 'Item 1', 'input'],
      ['meditationPage.items.1', 'Item 2', 'input'],
      ['meditationPage.items.2', 'Item 3', 'input'],
      ['meditationPage.items.3', 'Item 4', 'input'],
      ['meditationPage.items.4', 'Item 5', 'input'],
      ['meditationPage.items.5', 'Item 6', 'input'],
      ['meditationPage.pricePrimary', 'Preço principal', 'input'],
      ['meditationPage.priceSecondary', 'Preço secundário', 'input'],
      ['meditationPage.cta', 'Botão', 'input'],
    ],
  },
  {
    title: 'Eventos',
    description: 'Cabeçalho, categorias, botões e eventos-base.',
    fields: [
      ['eventsPage.hero.kicker', 'Etiqueta', 'input'],
      ['eventsPage.hero.title', 'Título', 'textarea'],
      ['eventsPage.hero.body', 'Texto', 'textarea'],
      ['eventsPage.discoveryLabel', 'Legenda da área', 'input'],
      ['eventsPage.intro.kicker', 'Categorias - etiqueta', 'input'],
      ['eventsPage.intro.title', 'Categorias - título', 'input'],
      ['eventsPage.backLabel', 'Botão voltar', 'input'],
      ['eventsPage.signupLabel', 'Botão inscrição', 'input'],
      ['eventsPage.emptyMessage', 'Mensagem vazia', 'textarea'],
      ['eventsPage.categories.0.label', 'Categoria 1 - nome selecionado', 'input'],
      ['eventsPage.categories.0.eyebrow', 'Categoria 1 - etiqueta', 'input'],
      ['eventsPage.categories.0.title', 'Categoria 1 - título', 'input'],
      ['eventsPage.categories.0.summary', 'Categoria 1 - texto', 'textarea'],
      ['eventsPage.categories.1.label', 'Categoria 2 - nome selecionado', 'input'],
      ['eventsPage.categories.1.eyebrow', 'Categoria 2 - etiqueta', 'input'],
      ['eventsPage.categories.1.title', 'Categoria 2 - título', 'input'],
      ['eventsPage.categories.1.summary', 'Categoria 2 - texto', 'textarea'],
      ['eventsPage.baseEvents.0.title', 'Evento-base 1 - título', 'input'],
      ['eventsPage.baseEvents.0.location', 'Evento-base 1 - local', 'input'],
      ['eventsPage.baseEvents.0.summary', 'Evento-base 1 - texto', 'textarea'],
      ['eventsPage.baseEvents.1.title', 'Evento-base 2 - título', 'input'],
      ['eventsPage.baseEvents.1.location', 'Evento-base 2 - local', 'input'],
      ['eventsPage.baseEvents.1.summary', 'Evento-base 2 - texto', 'textarea'],
      ['eventsPage.baseEvents.2.title', 'Evento-base 3 - título', 'input'],
      ['eventsPage.baseEvents.2.location', 'Evento-base 3 - local', 'input'],
      ['eventsPage.baseEvents.2.summary', 'Evento-base 3 - texto', 'textarea'],
      ['eventsPage.baseEvents.3.title', 'Evento-base 4 - título', 'input'],
      ['eventsPage.baseEvents.3.location', 'Evento-base 4 - local', 'input'],
      ['eventsPage.baseEvents.3.summary', 'Evento-base 4 - texto', 'textarea'],
    ],
  },
  {
    title: 'Blog',
    description: 'Cabeçalho e cards da página de blog.',
    fields: [
      ['blog.hero.title', 'Título', 'input'],
      ['blog.hero.body', 'Texto', 'textarea'],
      ['blog.sectionLabel', 'Etiqueta da lista', 'input'],
      ['blog.sectionTitle', 'Título da lista', 'input'],
      ['blog.cta', 'Chamada do card', 'input'],
      ['blog.posts.0.title', 'Post 1 - título', 'input'],
      ['blog.posts.0.excerpt', 'Post 1 - resumo', 'textarea'],
      ['blog.posts.1.title', 'Post 2 - título', 'input'],
      ['blog.posts.1.excerpt', 'Post 2 - resumo', 'textarea'],
      ['blog.posts.2.title', 'Post 3 - título', 'input'],
      ['blog.posts.2.excerpt', 'Post 3 - resumo', 'textarea'],
      ['blog.posts.3.title', 'Post 4 - título', 'input'],
      ['blog.posts.3.excerpt', 'Post 4 - resumo', 'textarea'],
      ['blog.posts.4.title', 'Post 5 - título', 'input'],
      ['blog.posts.4.excerpt', 'Post 5 - resumo', 'textarea'],
      ['blog.posts.5.title', 'Post 6 - título', 'input'],
      ['blog.posts.5.excerpt', 'Post 6 - resumo', 'textarea'],
    ],
  },
  {
    title: 'Empresas',
    description: 'Cabeçalho e cards da página para empresas.',
    fields: [
      ['corporate.hero.title', 'Título', 'input'],
      ['corporate.hero.body', 'Texto', 'textarea'],
      ['corporate.cards.0.title', 'Card 1 - título', 'input'],
      ['corporate.cards.0.text', 'Card 1 - texto', 'textarea'],
      ['corporate.cards.1.title', 'Card 2 - título', 'input'],
      ['corporate.cards.1.text', 'Card 2 - texto', 'textarea'],
    ],
  },
  {
    title: 'Agendamento',
    description: 'Textos do formulário da página Empresas.',
    fields: [
      ['appointment.messageIntro', 'Mensagem do WhatsApp', 'textarea'],
      ['appointment.fallbackMessage', 'Mensagem vazia', 'input'],
      ['appointment.kicker', 'Etiqueta', 'input'],
      ['appointment.title', 'Título', 'input'],
      ['appointment.body', 'Texto', 'textarea'],
      ['appointment.formLabel', 'Formulário - etiqueta', 'input'],
      ['appointment.formTitle', 'Formulário - título', 'input'],
      ['appointment.nameLabel', 'Campo nome', 'input'],
      ['appointment.emailLabel', 'Campo e-mail', 'input'],
      ['appointment.phoneLabel', 'Campo telefone', 'input'],
      ['appointment.phonePlaceholder', 'Placeholder telefone', 'input'],
      ['appointment.messageLabel', 'Campo mensagem', 'input'],
      ['appointment.messagePlaceholder', 'Placeholder mensagem', 'textarea'],
      ['appointment.submitLabel', 'Botão', 'input'],
    ],
  },
  {
    title: 'Página 404',
    description: 'Textos da página de erro.',
    fields: [
      ['notFound.kicker', 'Etiqueta', 'input'],
      ['notFound.title', 'Título', 'input'],
      ['notFound.body', 'Texto', 'textarea'],
      ['notFound.primaryCta', 'Botão principal', 'input'],
      ['notFound.secondaryCta', 'Botão secundário', 'input'],
    ],
  },
];

const DEFAULT_CONTENT_PATH = contentGroups[0].fields[0][0];

const contentCategoryOptions = [
  {
    id: 'home',
    title: 'Início',
    description: 'Textos da página principal.',
  },
  {
    id: 'pages',
    title: 'Páginas',
    description: 'Serviços, mentoria, meditação, blog, empresas e erro 404.',
  },
  {
    id: 'events-contact',
    title: 'Eventos e contato',
    description: 'Agenda, categorias, eventos e formulário.',
  },
  {
    id: 'global',
    title: 'Menu e rodapé',
    description: 'Textos que aparecem em várias páginas.',
  },
  {
    id: 'seo',
    title: 'SEO',
    description: 'Título e descrição usados no navegador e compartilhamentos.',
  },
];

const fieldPreviewHints = {
  'home.hero.kicker': 'Texto pequeno acima do título principal, no primeiro bloco da home.',
  'home.hero.title': 'Título grande que aparece logo na abertura do site.',
  'home.hero.body': 'Parágrafo abaixo do título principal da home.',
  'home.hero.cta': 'Texto do botão principal da abertura.',
  'home.transformation.eyebrow': 'Etiqueta pequena do bloco de transformação.',
  'home.transformation.title': 'Título do bloco que vem depois da abertura.',
  'home.transformation.body': 'Texto explicativo do bloco de transformação.',
  'home.transformation.cta': 'Texto do botão do bloco de transformação.',
  'home.luna.eyebrow': 'Etiqueta pequena no bloco de apresentação da Luna.',
  'home.luna.title': 'Título do bloco de apresentação da Luna.',
  'home.luna.body': 'Parágrafo principal da apresentação da Luna.',
  'home.luna.storyOpenLabel': 'Texto do botão antes de abrir a história.',
  'home.luna.storyCloseLabel': 'Texto do botão depois que a história abre.',
  'home.story.title': 'Título dentro da janela “Minha história”.',
  'home.story.paragraphs.0': 'Primeiro parágrafo dentro da janela “Minha história”.',
  'home.story.paragraphs.1': 'Segundo parágrafo dentro da janela “Minha história”.',
  'home.meditation.eyebrow': 'Etiqueta pequena do bloco de meditação na home.',
  'home.meditation.title': 'Título do bloco de meditação.',
  'home.meditation.body': 'Texto explicativo do bloco de meditação.',
  'home.meditation.cta': 'Texto do botão do bloco de meditação.',
  'home.faq.title': 'Título da seção de perguntas frequentes.',
  'home.faq.items.0.title': 'Primeira pergunta do final da home.',
  'home.faq.items.0.body': 'Resposta da primeira pergunta.',
  'home.faq.items.1.title': 'Segunda pergunta do final da home.',
  'home.faq.items.1.body': 'Resposta da segunda pergunta.',
  'home.faq.items.2.title': 'Terceira pergunta do final da home.',
  'home.faq.items.2.body': 'Resposta da terceira pergunta.',
};

function findContentField(path) {
  const group = contentGroups.find((item) => item.fields.some(([fieldPath]) => fieldPath === path));
  const field = group?.fields.find(([fieldPath]) => fieldPath === path);

  return {
    groupTitle: group?.title || 'Texto',
    label: field?.[1] || 'Campo',
  };
}

function getFieldHint(path) {
  if (fieldPreviewHints[path]) return fieldPreviewHints[path];
  const { groupTitle, label } = findContentField(path);
  return `Campo "${label}" do bloco "${groupTitle}".`;
}

function getContentGroupCategory(group) {
  const firstPath = group.fields[0]?.[0] || '';

  if (firstPath.startsWith('home.')) return 'home';
  if (firstPath.startsWith('layout.')) return 'global';
  if (firstPath.startsWith('seo.')) return 'seo';
  if (firstPath.startsWith('eventsPage.') || firstPath.startsWith('appointment.')) return 'events-contact';

  return 'pages';
}

function getPreviewTarget(path) {
  if (path.startsWith('home.hero')) return { label: 'Home - abertura', path: '/index.html', selector: '.hero-clean' };
  if (path.startsWith('home.transformation')) return { label: 'Home - transformação', path: '/index.html', selector: '.connected-photo-section' };
  if (path.startsWith('home.luna')) return { label: 'Home - Luna', path: '/index.html', selector: '#luna' };
  if (path.startsWith('home.story')) return { label: 'Home - história', path: '/index.html', selector: '#luna', action: 'openStory' };
  if (path.startsWith('home.offers')) return { label: 'Home - ofertas', path: '/index.html', selector: '.offer-grid' };
  if (path.startsWith('home.meditation')) return { label: 'Home - meditação', path: '/index.html', selector: '.meditation-block' };
  if (path.startsWith('home.testimonials')) return { label: 'Home - depoimentos', path: '/index.html', selector: '.testimonials' };
  if (path.startsWith('home.faq')) return { label: 'Home - perguntas', path: '/index.html', selector: '.faq' };
  if (path.startsWith('layout.footer') || path.startsWith('layout.socials')) return { label: 'Rodapé', path: '/index.html#footer', selector: '#footer' };
  if (path.startsWith('layout')) return { label: 'Menu do site', path: '/index.html', selector: '.site-header' };
  if (path.startsWith('services')) return { label: 'Página Serviços', path: '/servicos.html', selector: 'main' };
  if (path.startsWith('mentoring')) return { label: 'Página Mentoria', path: '/mentoria.html', selector: 'main' };
  if (path.startsWith('meditationPage')) return { label: 'Página Meditação', path: '/meditacao.html', selector: 'main' };
  if (path.startsWith('eventsPage.baseEvents')) {
    const eventIndex = Number(path.split('.')[2] || 0);
    const eventCategory = eventOptions[eventIndex]?.category || eventOptions[0].category;
    const categoryIndex = eventCategories.findIndex((category) => category.id === eventCategory);

    return {
      label: 'Página Eventos',
      path: '/eventos.html',
      selector: '.event-discovery',
      action: 'openEventCategory',
      actionIndex: Math.max(categoryIndex, 0),
    };
  }
  if (path.startsWith('eventsPage')) return { label: 'Página Eventos', path: '/eventos.html', selector: '.event-discovery', action: 'showEventCategories' };
  if (path.startsWith('blog')) return { label: 'Página Blog', path: '/conteudo.html', selector: 'main' };
  if (path.startsWith('corporate')) return { label: 'Página Empresas', path: '/b2b.html', selector: 'main' };
  if (path.startsWith('appointment')) return { label: 'Agendamento', path: '/b2b.html#agendamento', selector: '#agendamento' };
  if (path.startsWith('notFound')) return { label: 'Página 404', path: '/nao-existe.html', selector: 'main' };

  return { label: 'Home', path: '/index.html', selector: 'main' };
}

function highlightClass(path, activePath) {
  return path === activePath ? 'is-selected' : '';
}

function ContentSimulation({ content, activePath }) {
  const home = content.home;

  if (activePath.startsWith('home.transformation')) {
    return (
      <div className="admin-site-simulation admin-sim-split">
        <div className="admin-sim-copy">
          <p className={`admin-sim-eyebrow ${highlightClass('home.transformation.eyebrow', activePath)}`}>{home.transformation.eyebrow}</p>
          <h3 className={highlightClass('home.transformation.title', activePath)}>{home.transformation.title}</h3>
          <p className={highlightClass('home.transformation.body', activePath)}>{home.transformation.body}</p>
          <span className={`admin-sim-button ${highlightClass('home.transformation.cta', activePath)}`}>{home.transformation.cta}</span>
          <span className={`admin-sim-button muted ${highlightClass('home.transformation.imageAlt', activePath)}`}>{home.transformation.imageAlt}</span>
        </div>
        <img src={asset('photo-easel.png')} alt="" />
      </div>
    );
  }

  if (activePath.startsWith('home.luna')) {
    return (
      <div className="admin-site-simulation admin-sim-luna">
        <img src={asset('photo-luna-outdoor.png')} alt="" />
        <div className="admin-sim-copy">
          <p className={`admin-sim-eyebrow ${highlightClass('home.luna.eyebrow', activePath)}`}>{home.luna.eyebrow}</p>
          <h3 className={highlightClass('home.luna.title', activePath)}>{home.luna.title}</h3>
          <p className={highlightClass('home.luna.body', activePath)}>{home.luna.body}</p>
          <div className="admin-sim-button-row">
            <span className={`admin-sim-button ${highlightClass('home.luna.storyOpenLabel', activePath)}`}>{home.luna.storyOpenLabel}</span>
            <span className={`admin-sim-button muted ${highlightClass('home.luna.storyCloseLabel', activePath)}`}>{home.luna.storyCloseLabel}</span>
            <span className={`admin-sim-button muted ${highlightClass('home.luna.imageAlt', activePath)}`}>{home.luna.imageAlt}</span>
          </div>
        </div>
      </div>
    );
  }

  if (activePath.startsWith('home.story')) {
    return (
      <div className="admin-site-simulation admin-sim-story">
        <article>
          <img src={asset('luna-historia-clean.png')} alt="" />
          <div>
            <h3 className={highlightClass('home.story.title', activePath)}>{home.story.title}</h3>
            <div className="admin-sim-button-row">
              <span className={`admin-sim-button muted ${highlightClass('home.story.dialogLabel', activePath)}`}>{home.story.dialogLabel}</span>
              <span className={`admin-sim-button muted ${highlightClass('home.story.closeButtonLabel', activePath)}`}>{home.story.closeButtonLabel}</span>
              <span className={`admin-sim-button muted ${highlightClass('home.story.imageAlt', activePath)}`}>{home.story.imageAlt}</span>
            </div>
            {home.story.paragraphs.map((paragraph, index) => {
              const paragraphPath = `home.story.paragraphs.${index}`;

              return (
                <p key={paragraphPath} className={highlightClass(paragraphPath, activePath)}>{paragraph}</p>
              );
            })}
          </div>
        </article>
      </div>
    );
  }

  if (activePath.startsWith('home.meditation')) {
    return (
      <div className="admin-site-simulation admin-sim-meditation">
        <img src={asset('photo-meditation.png')} alt="" />
        <div className="admin-sim-copy">
          <p className={`admin-sim-eyebrow ${highlightClass('home.meditation.eyebrow', activePath)}`}>{home.meditation.eyebrow}</p>
          <h3 className={highlightClass('home.meditation.title', activePath)}>{home.meditation.title}</h3>
          <p className={highlightClass('home.meditation.body', activePath)}>{home.meditation.body}</p>
          <span className={`admin-sim-button ${highlightClass('home.meditation.cta', activePath)}`}>{home.meditation.cta}</span>
          <span className={`admin-sim-button muted ${highlightClass('home.meditation.imageAlt', activePath)}`}>{home.meditation.imageAlt}</span>
        </div>
      </div>
    );
  }

  if (activePath.startsWith('home.faq')) {
    return (
      <div className="admin-site-simulation admin-sim-faq">
        <h3 className={highlightClass('home.faq.title', activePath)}>{home.faq.title}</h3>
        <div className="admin-sim-faq-grid">
          {home.faq.items.map((item, index) => (
            <article key={`faq-${index}`}>
              <h4 className={highlightClass(`home.faq.items.${index}.title`, activePath)}>{item.title}</h4>
              <p className={highlightClass(`home.faq.items.${index}.body`, activePath)}>{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    );
  }

  if (activePath.startsWith('home.offers')) {
    return (
      <div className="admin-site-simulation admin-sim-cards">
        {content.home.offers.items.map((item, index) => (
          <article key={`offer-${index}`}>
            <h4 className={highlightClass(`home.offers.items.${index}.title`, activePath)}>{item.title}</h4>
            <p className={highlightClass(`home.offers.items.${index}.text`, activePath)}>{item.text}</p>
            <span className={`admin-sim-button ${highlightClass(`home.offers.items.${index}.cta`, activePath)}`}>{item.cta}</span>
          </article>
        ))}
      </div>
    );
  }

  if (activePath.startsWith('home.testimonials')) {
    return (
      <div className="admin-site-simulation admin-sim-testimonials">
        <p className={`admin-sim-eyebrow ${highlightClass('home.testimonials.kicker', activePath)}`}>{content.home.testimonials.kicker}</p>
        <h3 className={highlightClass('home.testimonials.title', activePath)}>{content.home.testimonials.title}</h3>
        {content.home.testimonials.items.map((item, index) => (
          <blockquote key={`testimonial-${index}`}>
            <p className={highlightClass(`home.testimonials.items.${index}.quote`, activePath)}>“{item.quote}”</p>
            <cite className={highlightClass(`home.testimonials.items.${index}.author`, activePath)}>{item.author}</cite>
            <span className={`admin-sim-button muted ${highlightClass(`home.testimonials.items.${index}.alt`, activePath)}`}>{item.alt}</span>
          </blockquote>
        ))}
        <div className="admin-sim-button-row">
          <span className={`admin-sim-button ${highlightClass('home.testimonials.previousLabel', activePath)}`}>{content.home.testimonials.previousLabel}</span>
          <span className={`admin-sim-button ${highlightClass('home.testimonials.nextLabel', activePath)}`}>{content.home.testimonials.nextLabel}</span>
          <span className={`admin-sim-button muted ${highlightClass('home.testimonials.selectLabel', activePath)}`}>{content.home.testimonials.selectLabel}</span>
        </div>
      </div>
    );
  }

  if (activePath.startsWith('layout')) {
    return (
      <div className="admin-site-simulation admin-sim-layout">
        <header>
          <strong className={highlightClass('layout.brand', activePath)}>{content.layout.brand}</strong>
          <span className={highlightClass('layout.menuLabel', activePath)}>{content.layout.menuLabel}</span>
          <span className={`admin-sim-button muted ${highlightClass('layout.navLabel', activePath)}`}>{content.layout.navLabel}</span>
        </header>
        <nav>
          {Object.entries(content.layout.nav).map(([key, label]) => (
            <span key={key} className={highlightClass(`layout.nav.${key}`, activePath)}>{label}</span>
          ))}
        </nav>
        <footer>
          <p className={`admin-sim-eyebrow ${highlightClass('layout.footer.kicker', activePath)}`}>{content.layout.footer.kicker}</p>
          <h3 className={highlightClass('layout.footer.title', activePath)}>{content.layout.footer.title}</h3>
          <p className={highlightClass('layout.footer.description', activePath)}>{content.layout.footer.description}</p>
          <div className="admin-sim-button-row">
            {content.layout.footer.handles.map((handle, index) => (
              <span key={`handle-${index}`} className={`admin-sim-button muted ${highlightClass(`layout.footer.handles.${index}`, activePath)}`}>{handle}</span>
            ))}
          </div>
          <div className="admin-sim-button-row">
            <span className={`admin-sim-button muted ${highlightClass('layout.footer.adminLabel', activePath)}`}>{content.layout.footer.adminLabel}</span>
            <span className={`admin-sim-button ${highlightClass('layout.footer.generalWhatsappLabel', activePath)}`}>{content.layout.footer.generalWhatsappLabel}</span>
            <span className={`admin-sim-button ${highlightClass('layout.footer.corporateWhatsappLabel', activePath)}`}>{content.layout.footer.corporateWhatsappLabel}</span>
          </div>
          <div className="admin-sim-button-row">
            <span className={`admin-sim-button muted ${highlightClass('layout.footer.channelsLabel', activePath)}`}>{content.layout.footer.channelsLabel}</span>
            <span className={`admin-sim-button muted ${highlightClass('layout.footer.socialsLabel', activePath)}`}>{content.layout.footer.socialsLabel}</span>
            {Object.entries(content.layout.socials).map(([key, label]) => (
              <span key={key} className={`admin-sim-button muted ${highlightClass(`layout.socials.${key}`, activePath)}`}>{label}</span>
            ))}
          </div>
        </footer>
      </div>
    );
  }

  if (activePath.startsWith('seo')) {
    const seoCards = [
      ['seo.default.title', 'Home', content.seo.default.title, content.seo.default.description],
      ['seo.routes.mentoring.title', 'Mentoria', content.seo.routes.mentoring.title, content.seo.routes.mentoring.description],
      ['seo.routes.services.title', 'Serviços', content.seo.routes.services.title, content.seo.routes.services.description],
      ['seo.routes.meditation.title', 'Meditação', content.seo.routes.meditation.title, content.seo.routes.meditation.description],
      ['seo.routes.events.title', 'Eventos', content.seo.routes.events.title, content.seo.routes.events.description],
      ['seo.routes.blog.title', 'Blog', content.seo.routes.blog.title, content.seo.routes.blog.description],
      ['seo.routes.corporate.title', 'Empresas', content.seo.routes.corporate.title, content.seo.routes.corporate.description],
      ['seo.notFound.title', 'Página 404', content.seo.notFound.title, content.seo.notFound.description],
    ];

    return (
      <div className="admin-site-simulation admin-sim-cards">
        {seoCards.map(([titlePath, label, title, description]) => {
          const descriptionPath = titlePath.replace('.title', '.description');

          return (
            <article key={titlePath}>
              <span className="admin-sim-eyebrow">{label}</span>
              <h4 className={highlightClass(titlePath, activePath)}>{title}</h4>
              <p className={highlightClass(descriptionPath, activePath)}>{description}</p>
            </article>
          );
        })}
      </div>
    );
  }

  if (activePath.startsWith('services')) {
    return (
      <div className="admin-site-simulation admin-sim-cards">
        <section>
          <h3 className={highlightClass('services.hero.title', activePath)}>{content.services.hero.title}</h3>
          <p className={highlightClass('services.hero.body', activePath)}>{content.services.hero.body}</p>
        </section>
        {content.services.cards.map((item, index) => (
          <article key={`service-${index}`}>
            <h4 className={highlightClass(`services.cards.${index}.title`, activePath)}>{item.title}</h4>
            <p className={highlightClass(`services.cards.${index}.text`, activePath)}>{item.text}</p>
            <span className={`admin-sim-button muted ${highlightClass(`services.cards.${index}.alt`, activePath)}`}>{item.alt}</span>
          </article>
        ))}
      </div>
    );
  }

  if (activePath.startsWith('mentoring')) {
    return (
      <div className="admin-site-simulation admin-sim-packages">
        <section>
          <h3 className={highlightClass('mentoring.hero.title', activePath)}>{content.mentoring.hero.title}</h3>
          <p className={highlightClass('mentoring.hero.body', activePath)}>{content.mentoring.hero.body}</p>
        </section>
        {content.mentoring.packages.map((item, index) => (
          <article key={`mentoring-${index}`}>
            <h4 className={highlightClass(`mentoring.packages.${index}.title`, activePath)}>{item.title}</h4>
            <span className={`admin-sim-button muted ${highlightClass(`mentoring.packages.${index}.alt`, activePath)}`}>{item.alt}</span>
            <p className={highlightClass(`mentoring.packages.${index}.sessions`, activePath)}>{item.sessions}</p>
            <ul>
              {item.items.map((listItem, itemIndex) => (
                <li key={`mentoring-${index}-${itemIndex}`} className={highlightClass(`mentoring.packages.${index}.items.${itemIndex}`, activePath)}>{listItem}</li>
              ))}
            </ul>
            <strong className={highlightClass(`mentoring.packages.${index}.price`, activePath)}>{item.price}</strong>
          </article>
        ))}
        <span className={`admin-sim-button ${highlightClass('mentoring.cta', activePath)}`}>{content.mentoring.cta}</span>
      </div>
    );
  }

  if (activePath.startsWith('meditationPage')) {
    return (
      <div className="admin-site-simulation admin-sim-packages">
        <section>
          <p className={highlightClass('meditationPage.ariaLabel', activePath)}>{content.meditationPage.ariaLabel}</p>
          <p className={highlightClass('meditationPage.intro', activePath)}>{content.meditationPage.intro}</p>
          <span className={`admin-sim-button muted ${highlightClass('meditationPage.imageAlt', activePath)}`}>{content.meditationPage.imageAlt}</span>
        </section>
        <article>
          <h3 className={highlightClass('meditationPage.title', activePath)}>{content.meditationPage.title}</h3>
          <p className={highlightClass('meditationPage.sessions', activePath)}>{content.meditationPage.sessions}</p>
          <ul>
            {content.meditationPage.items.map((item, index) => (
              <li key={`meditation-${index}`} className={highlightClass(`meditationPage.items.${index}`, activePath)}>{item}</li>
            ))}
          </ul>
          <strong className={highlightClass('meditationPage.pricePrimary', activePath)}>{content.meditationPage.pricePrimary}</strong>
          <span className={highlightClass('meditationPage.priceSecondary', activePath)}>{content.meditationPage.priceSecondary}</span>
          <span className={`admin-sim-button ${highlightClass('meditationPage.cta', activePath)}`}>{content.meditationPage.cta}</span>
        </article>
      </div>
    );
  }

  if (activePath.startsWith('eventsPage')) {
    return (
      <div className="admin-site-simulation admin-sim-events">
        <section>
          <p className={`admin-sim-eyebrow ${highlightClass('eventsPage.discoveryLabel', activePath)}`}>{content.eventsPage.discoveryLabel}</p>
          <p className={`admin-sim-eyebrow ${highlightClass('eventsPage.hero.kicker', activePath)}`}>{content.eventsPage.hero.kicker}</p>
          <h3 className={highlightClass('eventsPage.hero.title', activePath)}>{content.eventsPage.hero.title}</h3>
          <p className={highlightClass('eventsPage.hero.body', activePath)}>{content.eventsPage.hero.body}</p>
        </section>
        <section>
          <p className={`admin-sim-eyebrow ${highlightClass('eventsPage.intro.kicker', activePath)}`}>{content.eventsPage.intro.kicker}</p>
          <h4 className={highlightClass('eventsPage.intro.title', activePath)}>{content.eventsPage.intro.title}</h4>
          <div className="admin-sim-faq-grid">
            {content.eventsPage.categories.map((category, index) => (
              <article key={`event-category-${index}`}>
                <span className={highlightClass(`eventsPage.categories.${index}.label`, activePath)}>{category.label}</span>
                <span className={highlightClass(`eventsPage.categories.${index}.eyebrow`, activePath)}>{category.eyebrow}</span>
                <h4 className={highlightClass(`eventsPage.categories.${index}.title`, activePath)}>{category.title}</h4>
                <p className={highlightClass(`eventsPage.categories.${index}.summary`, activePath)}>{category.summary}</p>
              </article>
            ))}
          </div>
        </section>
        <div className="admin-sim-faq-grid">
          {content.eventsPage.baseEvents.map((item, index) => (
            <article key={`base-event-${index}`}>
              <span className={highlightClass(`eventsPage.baseEvents.${index}.location`, activePath)}>{item.location}</span>
              <h4 className={highlightClass(`eventsPage.baseEvents.${index}.title`, activePath)}>{item.title}</h4>
              <p className={highlightClass(`eventsPage.baseEvents.${index}.summary`, activePath)}>{item.summary}</p>
            </article>
          ))}
        </div>
        <div className="admin-sim-button-row">
          <span className={`admin-sim-button muted ${highlightClass('eventsPage.backLabel', activePath)}`}>{content.eventsPage.backLabel}</span>
          <span className={`admin-sim-button ${highlightClass('eventsPage.signupLabel', activePath)}`}>{content.eventsPage.signupLabel}</span>
          <span className={`admin-sim-button muted ${highlightClass('eventsPage.emptyMessage', activePath)}`}>{content.eventsPage.emptyMessage}</span>
        </div>
      </div>
    );
  }

  if (activePath.startsWith('blog')) {
    return (
      <div className="admin-site-simulation admin-sim-blog">
        <section>
          <h3 className={highlightClass('blog.hero.title', activePath)}>{content.blog.hero.title}</h3>
          <p className={highlightClass('blog.hero.body', activePath)}>{content.blog.hero.body}</p>
        </section>
        <p className={highlightClass('blog.sectionLabel', activePath)}>{content.blog.sectionLabel}</p>
        <h4 className={highlightClass('blog.sectionTitle', activePath)}>{content.blog.sectionTitle}</h4>
        <div className="admin-sim-faq-grid">
          {content.blog.posts.map((post, index) => (
            <article key={`blog-${index}`}>
              <h4 className={highlightClass(`blog.posts.${index}.title`, activePath)}>{post.title}</h4>
              <p className={highlightClass(`blog.posts.${index}.excerpt`, activePath)}>{post.excerpt}</p>
              <span className={`admin-sim-button muted ${highlightClass('blog.cta', activePath)}`}>{content.blog.cta}</span>
            </article>
          ))}
        </div>
      </div>
    );
  }

  if (activePath.startsWith('corporate')) {
    return (
      <div className="admin-site-simulation admin-sim-cards">
        <section>
          <h3 className={highlightClass('corporate.hero.title', activePath)}>{content.corporate.hero.title}</h3>
          <p className={highlightClass('corporate.hero.body', activePath)}>{content.corporate.hero.body}</p>
        </section>
        {content.corporate.cards.map((item, index) => (
          <article key={`corporate-${index}`}>
            <h4 className={highlightClass(`corporate.cards.${index}.title`, activePath)}>{item.title}</h4>
            <p className={highlightClass(`corporate.cards.${index}.text`, activePath)}>{item.text}</p>
          </article>
        ))}
      </div>
    );
  }

  if (activePath.startsWith('appointment')) {
    return (
      <div className="admin-site-simulation admin-sim-form">
        <section>
          <p className={`admin-sim-eyebrow ${highlightClass('appointment.kicker', activePath)}`}>{content.appointment.kicker}</p>
          <h3 className={highlightClass('appointment.title', activePath)}>{content.appointment.title}</h3>
          <p className={highlightClass('appointment.body', activePath)}>{content.appointment.body}</p>
          <p className={highlightClass('appointment.messageIntro', activePath)}>{content.appointment.messageIntro}</p>
          <p className={highlightClass('appointment.fallbackMessage', activePath)}>{content.appointment.fallbackMessage}</p>
        </section>
        <article>
          <p className={highlightClass('appointment.formLabel', activePath)}>{content.appointment.formLabel}</p>
          <h4 className={highlightClass('appointment.formTitle', activePath)}>{content.appointment.formTitle}</h4>
          <span className={highlightClass('appointment.nameLabel', activePath)}>{content.appointment.nameLabel}</span>
          <span className={highlightClass('appointment.emailLabel', activePath)}>{content.appointment.emailLabel}</span>
          <span className={highlightClass('appointment.phoneLabel', activePath)}>{content.appointment.phoneLabel}</span>
          <span className={highlightClass('appointment.phonePlaceholder', activePath)}>{content.appointment.phonePlaceholder}</span>
          <span className={highlightClass('appointment.messageLabel', activePath)}>{content.appointment.messageLabel}</span>
          <span className={highlightClass('appointment.messagePlaceholder', activePath)}>{content.appointment.messagePlaceholder}</span>
          <span className={`admin-sim-button ${highlightClass('appointment.submitLabel', activePath)}`}>{content.appointment.submitLabel}</span>
        </article>
      </div>
    );
  }

  if (activePath.startsWith('notFound')) {
    return (
      <div className="admin-site-simulation admin-sim-hero">
        <p className={`admin-sim-eyebrow ${highlightClass('notFound.kicker', activePath)}`}>{content.notFound.kicker}</p>
        <h3 className={highlightClass('notFound.title', activePath)}>{content.notFound.title}</h3>
        <p className={highlightClass('notFound.body', activePath)}>{content.notFound.body}</p>
        <div className="admin-sim-button-row">
          <span className={`admin-sim-button ${highlightClass('notFound.primaryCta', activePath)}`}>{content.notFound.primaryCta}</span>
          <span className={`admin-sim-button muted ${highlightClass('notFound.secondaryCta', activePath)}`}>{content.notFound.secondaryCta}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-site-simulation admin-sim-hero">
      <p className={`admin-sim-eyebrow ${highlightClass('home.hero.kicker', activePath)}`}>{home.hero.kicker}</p>
      <h3 className={highlightClass('home.hero.title', activePath)}>{home.hero.title}</h3>
      <p className={highlightClass('home.hero.body', activePath)}>{home.hero.body}</p>
      <span className={`admin-sim-button ${highlightClass('home.hero.cta', activePath)}`}>{home.hero.cta}</span>
    </div>
  );
}

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function hasAdminSession() {
  if (!canUseStorage()) return false;

  return (
    window.localStorage.getItem(ADMIN_AUTH_KEY) === 'true'
    || LEGACY_AUTH_KEYS.some((key) => window.localStorage.getItem(key) === 'true')
  );
}

function saveAdminSession() {
  if (!canUseStorage()) return;

  window.localStorage.setItem(ADMIN_AUTH_KEY, 'true');
  LEGACY_AUTH_KEYS.forEach((key) => window.localStorage.setItem(key, 'true'));
}

function clearAdminSession() {
  if (!canUseStorage()) return;

  window.localStorage.removeItem(ADMIN_AUTH_KEY);
  LEGACY_AUTH_KEYS.forEach((key) => window.localStorage.removeItem(key));
}

function getInitialPanel(pathname) {
  return pathname.toLowerCase().includes('conteudo') ? 'conteudo' : 'eventos';
}

function resolveImage(image, fallback) {
  if (!image) return asset(fallback);
  if (image.startsWith('data:') || image.startsWith('http') || image.startsWith('/')) return image;
  return asset(image);
}

function getValue(source, path) {
  return path.split('.').reduce((value, key) => value?.[key], source) || '';
}

function getFieldId(path) {
  return `content-${path.replace(/[^a-z0-9]/gi, '-')}`;
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

export default function AdminPainel() {
  const { pathname } = useLocation();
  const [activePanel, setActivePanel] = useState(() => getInitialPanel(pathname));
  const [isLoggedIn, setIsLoggedIn] = useState(() => hasAdminSession());
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [form, setForm] = useState(initialForm);
  const [customEvents, setCustomEvents] = useState(() => loadCustomEvents());
  const [hiddenEventIds, setHiddenEventIds] = useState(() => loadHiddenEventIds());
  const [content, setContent] = useState(() => loadSiteContent());
  const [message, setMessage] = useState('');
  const [activeContentGroupIndex, setActiveContentGroupIndex] = useState(0);
  const [activeContentCategory, setActiveContentCategory] = useState(() => getContentGroupCategory(contentGroups[0]));
  const [focusedContentPath, setFocusedContentPath] = useState(DEFAULT_CONTENT_PATH);
  const [isContentPreviewFullScreen, setIsContentPreviewFullScreen] = useState(false);
  const previewFrameRef = useRef(null);
  const activeContentGroup = contentGroups[activeContentGroupIndex] || contentGroups[0];
  const contentGroupsWithIndexes = useMemo(() => (
    contentGroups.map((group, index) => ({
      group,
      index,
      category: getContentGroupCategory(group),
    }))
  ), []);
  const activeCategory = contentCategoryOptions.find((category) => category.id === activeContentCategory) || contentCategoryOptions[0];
  const visibleContentGroups = contentGroupsWithIndexes.filter((item) => item.category === activeCategory.id);
  const requestedContentPath = focusedContentPath || DEFAULT_CONTENT_PATH;
  const activeContentFieldIndexRaw = activeContentGroup.fields.findIndex(([path]) => path === requestedContentPath);
  const activeContentFieldIndex = activeContentFieldIndexRaw >= 0 ? activeContentFieldIndexRaw : 0;
  const activeContentFieldEntry = activeContentGroup.fields[activeContentFieldIndex] || activeContentGroup.fields[0] || contentGroups[0].fields[0];
  const [activeContentPath, activeContentLabel, activeContentType] = activeContentFieldEntry;
  const activeContentValue = getValue(content, activeContentPath) ?? '';
  const activeContentFieldTotal = activeContentGroup.fields.length;
  const activeField = findContentField(activeContentPath);
  const previewTarget = useMemo(() => getPreviewTarget(activeContentPath), [activeContentPath]);
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

  function focusPreviewTarget() {
    const frame = previewFrameRef.current;

    try {
      const doc = frame?.contentDocument;
      if (!doc) return;

      if (previewTarget.action === 'showEventCategories') {
        doc.querySelector('.event-back')?.click();
      }

      if (previewTarget.action === 'openEventCategory') {
        const categoryButtons = doc.querySelectorAll('.event-choice-card');
        categoryButtons[previewTarget.actionIndex]?.click();
      }

      if (previewTarget.action === 'openStory') {
        const storyButton = doc.querySelector('.luna-story-trigger');
        if (storyButton?.getAttribute('aria-expanded') !== 'true') storyButton.click();
      }

      window.setTimeout(() => {
        const target = doc.querySelector(previewTarget.selector);
        target?.scrollIntoView({ block: 'start' });
      }, 60);
    } catch {
      // Same-origin preview should be readable; if the browser blocks it, the iframe still shows the page.
    }
  }

  function syncPreviewFrame() {
    const frameWindow = previewFrameRef.current?.contentWindow;

    try {
      frameWindow?.postMessage({ type: 'lumine-preview-content', content }, window.location.origin);
      window.setTimeout(focusPreviewTarget, 80);
    } catch {
      // The visible iframe remains usable even if a browser blocks preview syncing.
    }
  }

  useEffect(() => {
    setActivePanel(getInitialPanel(pathname));
  }, [pathname]);

  useEffect(() => {
    syncPreviewFrame();
  }, [content, previewTarget]);

  useEffect(() => {
    if (!isContentPreviewFullScreen) return undefined;

    function handleKeyDown(event) {
      if (event.key === 'Escape') setIsContentPreviewFullScreen(false);
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isContentPreviewFullScreen]);

  function handleLogin(event) {
    event.preventDefault();
    if (password.trim() !== ADMIN_PASSWORD) {
      setLoginError('Senha incorreta.');
      return;
    }

    saveAdminSession();
    setIsLoggedIn(true);
    setLoginError('');
  }

  function handleLogout() {
    clearAdminSession();
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

  function updateField(path, value) {
    setContent((current) => setValue(current, path, value));
    setMessage('');
  }

  function openContentPreview(path) {
    setFocusedContentPath(path);
  }

  function handleResetCurrentContentGroup() {
    const nextContent = activeContentGroup.fields.reduce((current, [path]) => (
      setValue(current, path, getValue(defaultSiteContent, path))
    ), content);

    setContent(nextContent);
    setMessage(`Bloco "${activeContentGroup.title}" restaurado para o padrão.`);
  }

  function handleResetCurrentContentField() {
    setContent((current) => setValue(current, activeContentPath, getValue(defaultSiteContent, activeContentPath)));
    setMessage(`Texto "${activeField.label}" restaurado para o padrÃ£o.`);
  }

  function goToContentField(direction) {
    const nextIndex = Math.min(
      Math.max(activeContentFieldIndex + direction, 0),
      activeContentFieldTotal - 1,
    );
    const nextPath = activeContentGroup.fields[nextIndex]?.[0];
    if (nextPath) openContentPreview(nextPath);
  }

  function selectContentCategory(categoryId) {
    const firstGroup = contentGroupsWithIndexes.find((item) => item.category === categoryId);
    if (!firstGroup) return;

    setActiveContentCategory(categoryId);
    setActiveContentGroupIndex(firstGroup.index);
    setFocusedContentPath(firstGroup.group.fields[0][0]);
    setIsContentPreviewFullScreen(false);
  }

  function selectContentGroup(index) {
    const nextGroup = contentGroups[index] || contentGroups[0];
    setActiveContentCategory(getContentGroupCategory(nextGroup));
    setActiveContentGroupIndex(index);
    setFocusedContentPath(nextGroup.fields[0][0]);
    setIsContentPreviewFullScreen(false);
  }

  function handleSaveContent(event) {
    event.preventDefault();
    saveSiteContent(content);
    setMessage('Conteúdo salvo. O site já usa esses textos.');
  }

  function handleResetContent() {
    resetSiteContent();
    setContent(defaultSiteContent);
    setMessage('Conteúdo restaurado para o padrão.');
  }

  if (!isLoggedIn) {
    return (
      <main className="admin-events-page admin-panel-page">
        <section className="admin-login-card">
          <p className="kicker">Área Lumine</p>
          <h1>Painel interno</h1>
          <p className="admin-form-note">Use a mesma senha para editar textos e gerenciar eventos.</p>
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
    <main className="admin-events-page admin-panel-page admin-content-page">
      <section className="admin-events-shell">
        <header className="admin-events-head">
          <div>
            <p className="kicker">Área Lumine</p>
            <h1>Painel</h1>
            <p>Edite os textos da home e cadastre eventos no mesmo lugar.</p>
          </div>
          <div className="admin-head-actions">
            <Link className="event-admin-link" to="/index.html">Ver home</Link>
            <Link className="event-admin-link" to="/eventos.html">Ver eventos</Link>
            <button type="button" className="event-admin-link" onClick={handleLogout}>Sair</button>
          </div>
        </header>

        <div className="admin-panel-tabs" role="tablist" aria-label="Áreas do painel">
          <button
            type="button"
            className={`admin-panel-tab ${activePanel === 'eventos' ? 'is-active' : ''}`}
            onClick={() => setActivePanel('eventos')}
            role="tab"
            aria-selected={activePanel === 'eventos'}
          >
            Eventos
          </button>
          <button
            type="button"
            className={`admin-panel-tab ${activePanel === 'conteudo' ? 'is-active' : ''}`}
            onClick={() => setActivePanel('conteudo')}
            role="tab"
            aria-selected={activePanel === 'conteudo'}
          >
            Textos
          </button>
        </div>

        {activePanel === 'eventos' ? (
          <div className="admin-panel-section" role="tabpanel" aria-label="Eventos">
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
                <p>eventos-base continuam no site como exemplo e podem ser removidos pela lista abaixo.</p>
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
          </div>
        ) : (
          <div className="admin-panel-section" role="tabpanel" aria-label="Textos">
            <div className="admin-content-grid">
              <form className="admin-event-form admin-content-form" onSubmit={handleSaveContent}>
                <section className="admin-content-picker" aria-label="Blocos de texto">
                  <div className="admin-content-picker-intro">
                    <p className="kicker">Passo 1</p>
                    <h2>Escolha uma área</h2>
                    <p>Mostramos poucos blocos por vez para facilitar a edição.</p>
                  </div>

                  <div className="admin-content-categories" role="tablist" aria-label="Áreas do site">
                    {contentCategoryOptions.map((category) => {
                      const groupCount = contentGroupsWithIndexes.filter((item) => item.category === category.id).length;

                      return (
                        <button
                          key={category.id}
                          type="button"
                          className={`admin-content-category ${activeCategory.id === category.id ? 'is-active' : ''}`}
                          onClick={() => selectContentCategory(category.id)}
                          role="tab"
                          aria-selected={activeCategory.id === category.id}
                        >
                          <strong>{category.title}</strong>
                          <span>{category.description}</span>
                          <small>{groupCount} bloco{groupCount === 1 ? '' : 's'}</small>
                        </button>
                      );
                    })}
                  </div>

                  <div className="admin-content-picker-intro compact">
                    <p className="kicker">Passo 2</p>
                    <h2>Escolha o bloco</h2>
                    <p>{activeCategory.description}</p>
                  </div>

                  <label className="admin-content-select-card">
                    <span>Bloco que será editado</span>
                    <select
                      value={activeContentGroupIndex}
                      onChange={(event) => selectContentGroup(Number(event.target.value))}
                    >
                      {visibleContentGroups.map(({ group, index }) => (
                        <option key={group.title} value={index}>
                          {group.title} - {group.fields.length} texto{group.fields.length === 1 ? '' : 's'}
                        </option>
                      ))}
                    </select>
                    <small>{activeContentGroup.description}</small>
                  </label>
                </section>

                <fieldset className="admin-content-group">
                  <legend>{activeContentGroup.title}</legend>
                  <div className="admin-content-group-head">
                    <div>
                      <p className="kicker">Passo 3</p>
                      <strong>Edite um texto por vez</strong>
                      <p>{activeContentGroup.description}</p>
                    </div>
                    <div className="admin-content-group-actions">
                      <span>{activeContentGroup.fields.length} campo{activeContentGroup.fields.length === 1 ? '' : 's'}</span>
                      <button className="event-admin-link" type="button" onClick={handleResetCurrentContentGroup}>
                        Restaurar bloco
                      </button>
                    </div>
                  </div>
                  <div className="admin-selected-field-note">
                    <span>Editando agora</span>
                    <p><strong>{activeField.label}</strong></p>
                    <small>{getFieldHint(activeContentPath)}</small>
                  </div>

                  <div className="admin-content-field-tools">
                    <label className="admin-content-select-card compact">
                      <span>Texto dentro deste bloco</span>
                      <select
                        value={activeContentPath}
                        onChange={(event) => openContentPreview(event.target.value)}
                      >
                        {activeContentGroup.fields.map(([path, label]) => (
                          <option key={path} value={path}>{label}</option>
                        ))}
                      </select>
                      <small>Texto {activeContentFieldIndex + 1} de {activeContentFieldTotal}</small>
                    </label>

                    <div className="admin-content-editor-actions">
                      <button
                        className="event-admin-link"
                        type="button"
                        onClick={() => goToContentField(-1)}
                        disabled={activeContentFieldIndex === 0}
                      >
                        Texto anterior
                      </button>
                      <button
                        className="event-admin-link"
                        type="button"
                        onClick={() => goToContentField(1)}
                        disabled={activeContentFieldIndex >= activeContentFieldTotal - 1}
                      >
                        Próximo texto
                      </button>
                      <button className="event-admin-link" type="button" onClick={handleResetCurrentContentField}>
                        Restaurar este texto
                      </button>
                    </div>
                  </div>

                  <div className="admin-content-fields">
                    {activeContentGroup.fields.map(([path, label, type]) => {
                      const fieldId = getFieldId(path);
                      const fieldValue = getValue(content, path) ?? '';
                      const shouldShowPreview = focusedContentPath === path;

                      return (
                        <div
                          key={path}
                          className={`admin-content-field-row ${focusedContentPath === path ? 'is-active' : ''} ${shouldShowPreview ? 'has-preview' : ''}`}
                          onClick={() => openContentPreview(path)}
                        >
                          <label className="admin-content-control" htmlFor={fieldId}>
                            <span className="admin-content-control-head">
                              <strong>{label}</strong>
                              <small>{type === 'textarea' ? 'Texto longo' : 'Texto curto'}</small>
                            </span>
                            {type === 'textarea' ? (
                              <textarea
                                id={fieldId}
                                value={fieldValue}
                                onChange={(event) => updateField(path, event.target.value)}
                                onFocus={() => openContentPreview(path)}
                              />
                            ) : (
                              <input
                                id={fieldId}
                                value={fieldValue}
                                onChange={(event) => updateField(path, event.target.value)}
                                onFocus={() => openContentPreview(path)}
                              />
                            )}
                          </label>
                          {shouldShowPreview && (
                            <aside
                              className={`admin-event-preview admin-content-preview ${isContentPreviewFullScreen ? 'is-fullscreen' : ''}`}
                            >
                              <div className="admin-preview-toolbar">
                                <div>
                                  <p className="kicker">Prévia real do site</p>
                                  <span>{previewTarget.label}</span>
                                </div>
                                <button
                                  type="button"
                                  className="event-admin-link"
                                  onClick={() => setIsContentPreviewFullScreen((current) => !current)}
                                >
                                  {isContentPreviewFullScreen ? 'Sair da tela cheia' : 'Tela cheia'}
                                </button>
                              </div>
                              <div className="admin-live-preview-head">
                                <h2>{activeField.groupTitle}</h2>
                                <p><strong>{activeField.label}</strong> - {getFieldHint(activeContentPath)}</p>
                              </div>
                              <div className="admin-real-preview-shell">
                                <iframe
                                  ref={previewFrameRef}
                                  title="Prévia real do site"
                                  src={previewTarget.path}
                                  onLoad={syncPreviewFrame}
                                />
                              </div>
                            </aside>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </fieldset>

                <div className="admin-content-actions">
                  <button className="pill pink" type="submit">Salvar textos</button>
                  <button className="event-admin-link" type="button" onClick={handleResetContent}>Restaurar padrão</button>
                </div>
                {message && <p className="admin-form-note">{message}</p>}
              </form>

            </div>
          </div>
        )}
      </section>
    </main>
  );
}
