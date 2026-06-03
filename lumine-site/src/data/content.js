export const CONTENT_STORAGE_KEY = 'lumine-site-content-v1';

export const defaultSiteContent = {
  home: {
    hero: {
      kicker: 'Mentorias, experiências e conversas profundas',
      title: 'Há partes suas que ainda esperam ser vistas.',
      body: 'E nossa função é mostrar isso. Um espaço para mulheres que desejam viver com mais clareza, presença e verdade.',
      cta: 'Quero começar',
    },
    transformation: {
      eyebrow: 'Sua transformação interna',
      title: 'começa aqui',
      body: 'Mentorias, vivências e práticas para voltar para si, liberar crenças limitantes e transformar desejo em direção.',
      cta: 'Conhecer caminhos',
    },
    luna: {
      eyebrow: 'Olá querida, eu sou a Luna',
      title: 'Um universo criado para transformar internamente.',
      body: 'Aqui você encontra mentorias, meditação, vivências e propostas para empresas que desejam cuidar de pessoas de forma mais humana.',
      storyOpenLabel: 'Conhecer história',
      storyCloseLabel: 'Fechar história',
    },
    story: {
      title: 'Minha história',
      paragraphs: [
        'Esse espaço é seu para contar quem você é, sua trajetória e como nasceu a missão da Lumine.',
        'Você pode editar esse texto com sua voz pessoal para criar uma conexão ainda mais forte com quem chega aqui.',
      ],
    },
    meditation: {
      eyebrow: 'Meditação',
      title: 'Conexão interna para voltar ao corpo.',
      body: 'Uma prática guiada para aquietar a mente, usar a respiração como ponto de apoio e cultivar mais calma no cotidiano.',
      cta: 'Conhecer meditação',
    },
    faq: {
      title: 'Perguntas frequentes',
      items: [
        {
          title: 'Como escolho a mentoria?',
          body: 'A conversa inicial ajuda a entender se faz mais sentido uma jornada mensal ou de dois meses.',
        },
        {
          title: 'Os encontros são online?',
          body: 'As mentorias são individuais e online. As vivências e eventos acontecem presencialmente por cidade.',
        },
        {
          title: 'Empresas podem contratar?',
          body: 'Sim. A Lumine cria propostas para equipes, eventos internos e experiências de cuidado coletivo.',
        },
      ],
    },
  },
};

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function mergeContent(base, saved) {
  if (Array.isArray(base)) return Array.isArray(saved) ? saved : base;
  if (!base || typeof base !== 'object') return saved ?? base;
  if (!saved || typeof saved !== 'object') return base;

  return Object.entries(base).reduce((merged, [key, value]) => ({
    ...merged,
    [key]: mergeContent(value, saved[key]),
  }), {});
}

export function normalizeSiteContent(content) {
  return mergeContent(defaultSiteContent, content);
}

export function loadSiteContent() {
  if (!canUseStorage()) return defaultSiteContent;

  try {
    const saved = window.localStorage.getItem(CONTENT_STORAGE_KEY);
    return saved ? normalizeSiteContent(JSON.parse(saved)) : defaultSiteContent;
  } catch {
    return defaultSiteContent;
  }
}

export function saveSiteContent(content) {
  if (!canUseStorage()) return;

  const normalizedContent = normalizeSiteContent(content);
  window.localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(normalizedContent));
  window.dispatchEvent(new CustomEvent('lumine-content-updated', { detail: normalizedContent }));
}

export function resetSiteContent() {
  if (!canUseStorage()) return;

  window.localStorage.removeItem(CONTENT_STORAGE_KEY);
  window.dispatchEvent(new CustomEvent('lumine-content-updated', { detail: defaultSiteContent }));
}
