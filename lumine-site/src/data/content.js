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
      imageAlt: 'Mulher em processo criativo',
    },
    luna: {
      eyebrow: 'Olá querida, eu sou a Luna',
      title: 'Um universo criado para transformar internamente.',
      body: 'Aqui você encontra mentorias, meditação, vivências e propostas para empresas que desejam cuidar de pessoas de forma mais humana.',
      storyOpenLabel: 'Conhecer história',
      storyCloseLabel: 'Fechar história',
      imageAlt: 'Luna em ambiente natural',
    },
    story: {
      title: 'Minha história',
      dialogLabel: 'Minha história',
      closeButtonLabel: 'Fechar história',
      imageAlt: 'Luna sorrindo em meio à natureza',
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
      imageAlt: 'Meditação em grupo',
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
    offers: {
      items: [
        {
          title: 'Mentorias individuais',
          text: 'Jornadas de transformação em pacotes de 30 ou 61 dias.',
          cta: 'Conhecer mentoria',
        },
        {
          title: 'Vivências',
          text: 'Eventos pontuais em Paranavaí e São Paulo.',
          cta: 'Ver eventos',
        },
        {
          title: 'Aniversários e comemorações',
          text: 'Experiências com yoga, pintura, brunch e práticas criadas para celebrar com presença.',
          cta: 'Solicitar proposta',
        },
      ],
    },
    testimonials: {
      kicker: 'Depoimentos',
      title: 'Mulheres que voltaram para si',
      previousLabel: 'Depoimento anterior',
      nextLabel: 'Próximo depoimento',
      selectLabel: 'Selecionar depoimento',
      items: [
        {
          quote: 'Me senti de volta comigo mesma, principalmente na questão da jardinagem que pude fazer, que tanto amo e a mini eu também sempre amou. Um lugar que, além de me acolher, acolheu minhas histórias.',
          author: 'Participante • Vivência Lumine',
          alt: 'Participante sentada em momento de pausa durante vivência',
        },
        {
          quote: 'Senti que tudo foi escolhido nos pequenos detalhes, e que isso contribuiu para a experiência como um todo. Muitas práticas legais que não fazemos no dia a dia, mas que quando paramos para pensar faz muita diferença.',
          author: 'Participante • Encontro Lumine',
          alt: 'Participantes sorrindo sentadas em roda',
        },
        {
          quote: 'Depois que conheci a Lumine passei a adorar fazer atividades em grupo, me ajuda na criatividade e faço coisas que não experimentaria fazer sozinha pela primeira vez. Hoje gosto de pintar, criar mais e etc.',
          author: 'Participante • Comunidade Lumine',
          alt: 'Participantes pintando juntas durante atividade criativa',
        },
      ],
    },
  },
  layout: {
    brand: 'Lumine',
    menuLabel: 'Menu',
    navLabel: 'Menu principal',
    socials: {
      instagram: 'Instagram',
      tiktok: 'TikTok',
      email: 'E-mail',
    },
    nav: {
      mentoring: 'Mentoria',
      services: 'Serviços',
      meditation: 'Meditação',
      events: 'Eventos',
      blog: 'Blog',
      corporate: 'Empresas',
    },
    footer: {
      kicker: 'Contato',
      title: 'Fale com a gente',
      description: 'Para dúvidas, agenda e propostas, escolha o canal que fizer mais sentido.',
      handles: ['@lunabmachado', '@lumineclub_'],
      adminLabel: 'Área Lumine',
      generalWhatsappLabel: 'Falar pelo WhatsApp',
      corporateWhatsappLabel: 'Solicitar proposta',
      channelsLabel: 'Canais de contato',
      socialsLabel: 'Redes sociais',
    },
  },
  seo: {
    default: {
      title: 'Lumine | Autoconhecimento e presença',
      description: 'Mentorias, meditações, vivências e experiências para voltar para si com mais clareza, presença e verdade.',
    },
    notFound: {
      title: 'Página não encontrada | Lumine',
      description: 'Essa página da Lumine não foi encontrada.',
    },
    routes: {
      mentoring: {
        title: 'Mentoria | Lumine',
        description: 'Jornadas individuais de mentoria para mulheres que buscam clareza, presença e transformação interna.',
      },
      services: {
        title: 'Serviços | Lumine',
        description: 'Conheça os caminhos da Lumine: mentorias, vivências, meditação e propostas para empresas.',
      },
      meditation: {
        title: 'Meditação | Lumine',
        description: 'Práticas de meditação guiada para aquietar a mente, voltar ao corpo e cultivar presença no cotidiano.',
      },
      events: {
        title: 'Eventos | Lumine',
        description: 'Vivências, retiros e encontros presenciais da Lumine em diferentes cidades.',
      },
      blog: {
        title: 'Blog | Lumine',
        description: 'Conteúdos da Lumine sobre autoconhecimento, presença, corpo e transformação interna.',
      },
      corporate: {
        title: 'Empresas | Lumine',
        description: 'Experiências e propostas da Lumine para empresas que desejam cuidar de pessoas de forma mais humana.',
      },
      admin: {
        title: 'Área Lumine | Painel',
        description: 'Painel interno da Lumine.',
      },
    },
  },
  services: {
    hero: {
      title: 'Serviços',
      body: 'Caminhos diferentes para momentos diferentes: mentoria, meditação, vivências e propostas para empresas.',
    },
    cards: [
      {
        title: 'Mentoria',
        text: 'Pacotes Luz e Iluminada para transformação individual.',
        alt: 'Mentoria individual',
      },
      {
        title: 'Meditação',
        text: 'Uma meditação guiada disponível para compra.',
        alt: 'Meditação guiada',
      },
      {
        title: 'Eventos',
        text: 'Vivências presenciais divididas por cidade.',
        alt: 'Vivência presencial',
      },
      {
        title: 'Empresas',
        text: 'Propostas de bem-estar para empresas e colaboradores.',
        alt: 'Experiência de cuidado coletivo',
      },
    ],
  },
  mentoring: {
    hero: {
      title: 'Um caminho para a transformação',
      body: 'Descubra quem você realmente é e como agir para ressoar a sua verdadeira essência.',
    },
    cta: 'Quero começar',
    packages: [
      {
        title: 'Mentoria Individual (Pacote Mensal) + Salto Quântico',
        alt: 'Mulher segurando um livro',
        sessions: '4 sessões online individuais de 1 hora',
        items: [
          'Meditação de conexão interna em todas as sessões',
          'Identificação e liberação de crenças limitantes',
          'Clareza em relação aos desejos e objetivos',
          'Guia prático de rotina: fazer para ser',
        ],
        price: 'R$ 890 à vista ou 2x de R$ 445',
      },
      {
        title: 'Mentoria Individual (2 Meses) + Salto Quântico',
        alt: 'Vestido verde com bordados',
        sessions: '8 sessões online individuais de 1 hora',
        items: [
          'Meditações guiadas de conexão interna',
          'Reestruturação de pensamentos e desbloqueio emocional',
          'Novas perspectivas para a relação consigo mesma',
          'Mapa pessoal interno de autoconhecimento',
        ],
        price: 'R$ 1.690 à vista ou 4x de R$ 422,50',
      },
    ],
  },
  meditationPage: {
    ariaLabel: 'Meditação de conexão interna',
    intro: 'Meditação de conexão interna. Aprenda a usar sua respiração para se acalmar em situações que te vulnerariam.',
    imageAlt: 'Mulher de vestido branco segurando um livro aberto',
    title: 'Meditação',
    sessions: '4 sessões online individuais de 1 hora',
    items: [
      'Meditação de conexão interna em todas as sessões',
      'Identificação e liberação de crenças limitantes',
      'Clareza em relação aos seus desejos e objetivos',
      'Reestruturação de pensamentos para liberação de crenças',
      'Guia prático para a rotina: fazer para ser',
      'Exercícios personalizados de meditação em todas as mentorias',
    ],
    pricePrimary: 'R$ 890 à vista',
    priceSecondary: 'ou 2x de R$ 445',
    cta: 'Comprar meditação',
  },
  eventsPage: {
    discoveryLabel: 'Explorar eventos por categoria',
    hero: {
      kicker: 'Agenda Lumine',
      title: 'Escolha o tipo de encontro que combina com seu momento.',
      body: 'Vivências para encontros mais próximos. Retiros e viagens para pausas mais profundas.',
    },
    intro: {
      kicker: 'Categorias',
      title: 'Por onde você quer começar?',
    },
    backLabel: 'Voltar para categorias',
    signupLabel: 'Inscrição',
    emptyMessage: 'Nenhum evento cadastrado nessa categoria no momento.',
    categories: [
      {
        label: 'Vivências',
        eyebrow: 'Encontros presenciais',
        title: 'Vivências',
        summary: 'Rodas, práticas e experiências sensíveis para mulheres que desejam presença, troca e reconexão.',
      },
      {
        label: 'Retiros e viagens',
        eyebrow: 'Imersões Lumine',
        title: 'Retiros e viagens',
        summary: 'Pausas mais profundas, deslocamentos e imersões criadas para viver cuidado com tempo e beleza.',
      },
    ],
    baseEvents: [
      {
        location: 'Paranavaí',
        title: 'Vivência de reconexão',
        summary: 'Um encontro com roda de conversa, práticas de presença e criação sensível.',
      },
      {
        location: 'São Paulo',
        title: 'Vivência urbana',
        summary: 'Uma pausa no ritmo da cidade para respirar, se escutar e voltar para si.',
      },
      {
        location: 'Paranavaí',
        title: 'Retiro de fim de semana',
        summary: 'Uma imersão curta com práticas guiadas, cuidado coletivo e reconexão interna.',
      },
      {
        location: 'São Paulo',
        title: 'Imersão e viagem',
        summary: 'Experiência aprofundada para mulheres que desejam ampliar presença e clareza.',
      },
    ],
  },
  blog: {
    hero: {
      title: 'Blog',
      body: 'Textos, reflexões e bastidores sobre autoconhecimento, presença e transformação.',
    },
    sectionLabel: 'Posts recentes',
    sectionTitle: 'Reflexões para ler com calma',
    cta: 'Ler post →',
    posts: [
      {
        title: 'Desacelerar para se Escutar',
        excerpt: 'Uma prática simples para sair do automático e voltar para o corpo.',
      },
      {
        title: 'O que a Presença Revela',
        excerpt: 'Quando você silencia o ruído, começa a perceber o que realmente importa.',
      },
      {
        title: 'Cuidar de Si sem Culpa',
        excerpt: 'Reflexões sobre limites, descanso e energia emocional no dia a dia.',
      },
      {
        title: 'Corpo, Respiração e Clareza',
        excerpt: 'Como pequenas pausas ao longo do dia transformam sua percepção.',
      },
      {
        title: 'Rituais de Recomeço',
        excerpt: 'Sugestões de micro-rituais para reconexão em semanas intensas.',
      },
      {
        title: 'A Arte de Voltar para Si',
        excerpt: 'Um convite para criar espaços de verdade, presença e escuta interna.',
      },
    ],
  },
  corporate: {
    hero: {
      title: 'Bem-estar para empresas',
      body: 'Propostas para empresas que desejam cuidar da saúde emocional, presença e união dos colaboradores.',
    },
    cards: [
      {
        title: 'Palestras',
        text: 'Encontros sobre presença, autocuidado e clareza emocional.',
      },
      {
        title: 'Workshop',
        text: 'Encontros práticos e personalizados para equipes.',
      },
    ],
  },
  appointment: {
    messageIntro: 'Olá, quero conversar sobre meu próximo passo na Lumine.',
    fallbackMessage: 'Não informado',
    kicker: 'Contato + agendamento',
    title: 'Vamos conversar?',
    body: 'Preencha seus dados e conte brevemente o que te trouxe até aqui. A Luna responde pelo WhatsApp em até 48 horas úteis.',
    formLabel: 'Agendamento',
    formTitle: 'Seus dados',
    nameLabel: 'Nome',
    emailLabel: 'E-mail',
    phoneLabel: 'Telefone / WhatsApp',
    phonePlaceholder: '(44) 99999-9999',
    messageLabel: 'Mensagem',
    messagePlaceholder: 'Conte brevemente o que te trouxe até aqui...',
    submitLabel: 'Enviar pelo WhatsApp',
  },
  notFound: {
    kicker: '404',
    title: 'Página não encontrada.',
    body: 'Esse caminho não existe ou mudou de lugar. Volte para o início e continue navegando pela Lumine.',
    primaryCta: 'Voltar ao início',
    secondaryCta: 'Ver eventos',
  },
};

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function mergeContent(base, saved) {
  if (Array.isArray(base)) {
    if (!Array.isArray(saved)) return base;

    return [
      ...base.map((item, index) => mergeContent(item, saved[index])),
      ...saved.slice(base.length),
    ];
  }
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
