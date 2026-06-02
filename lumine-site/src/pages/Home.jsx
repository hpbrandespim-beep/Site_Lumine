import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { asset } from '../data/site.js';

const testimonials = [
  {
    quote: 'Me senti de volta comigo mesma, principalmente na questão da jardinagem que pude fazer, que tanto amo e a mini eu também sempre amou. Um lugar que, além de me acolher, acolheu minhas histórias.',
    author: 'Participante • Vivência Lumine',
    image: 'testimonial-quiet.png',
    alt: 'Participante sentada em momento de pausa durante vivência',
  },
  {
    quote: 'Senti que tudo foi escolhido nos pequenos detalhes, e que isso contribuiu para a experiência como um todo. Muitas práticas legais que não fazemos no dia a dia, mas que quando paramos para pensar faz muita diferença.',
    author: 'Participante • Encontro Lumine',
    image: 'testimonial-group.png',
    alt: 'Participantes sorrindo sentadas em roda',
  },
  {
    quote: 'Depois que conheci a Lumine passei a adorar fazer atividades em grupo, me ajuda na criatividade e faço coisas que não experimentaria fazer sozinha pela primeira vez. Hoje gosto de pintar, criar mais e etc.',
    author: 'Participante • Comunidade Lumine',
    image: 'testimonial-art.png',
    alt: 'Participantes pintando juntas durante atividade criativa',
  },
];

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isLunaVisible, setIsLunaVisible] = useState(false);
  const [flowerFrame, setFlowerFrame] = useState(1);
  const [isStoryCardOpen, setIsStoryCardOpen] = useState(false);
  const lunaCopyRef = useRef(null);
  const lunaVisibleRef = useRef(false);
  const flowerRafRef = useRef(0);

  const currentTestimonial = testimonials[activeTestimonial];
  const flowerFrameSrc = asset(`flower-seq-40/frame-${String(flowerFrame).padStart(2, '0')}.png`);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveTestimonial((current) => (current + 1) % testimonials.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const maxFrame = 40;
    const preloaded = [];

    for (let index = 1; index <= maxFrame; index += 1) {
      const image = new window.Image();
      image.src = asset(`flower-seq-40/frame-${String(index).padStart(2, '0')}.png`);
      preloaded.push(image);
    }

    return () => {
      preloaded.length = 0;
    };
  }, []);

  useEffect(() => {
    const section = lunaCopyRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      const ratio = entry.isIntersecting ? entry.intersectionRatio : 0;
      const wasVisible = lunaVisibleRef.current;
      const shouldShow = wasVisible ? ratio > 0.1 : ratio >= 0.24;

      if (shouldShow !== wasVisible) {
        lunaVisibleRef.current = shouldShow;
        setIsLunaVisible(shouldShow);
      }
    }, {
      threshold: [0, 0.08, 0.1, 0.18, 0.24, 0.36, 0.5],
      rootMargin: '0px 0px -10% 0px',
    });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const maxFrame = 40;
    const durationMs = 4400;

    if (flowerRafRef.current) {
      window.cancelAnimationFrame(flowerRafRef.current);
      flowerRafRef.current = 0;
    }

    if (!isLunaVisible) {
      setFlowerFrame(1);
      return undefined;
    }

    let startTime = 0;
    setFlowerFrame(1);

    const animate = (timestamp) => {
      if (!lunaVisibleRef.current) return;
      if (!startTime) startTime = timestamp;

      const elapsed = timestamp - startTime;
      const progress = Math.min(1, elapsed / durationMs);
      const nextFrame = Math.min(maxFrame, 1 + Math.floor(progress * (maxFrame - 1)));

      setFlowerFrame((current) => (current === nextFrame ? current : nextFrame));

      if (progress < 1) {
        flowerRafRef.current = window.requestAnimationFrame(animate);
      }
    };

    flowerRafRef.current = window.requestAnimationFrame(animate);

    return () => {
      if (flowerRafRef.current) {
        window.cancelAnimationFrame(flowerRafRef.current);
        flowerRafRef.current = 0;
      }
    };
  }, [isLunaVisible]);

  function moveTestimonial(direction) {
    setActiveTestimonial((current) => (
      current + direction + testimonials.length
    ) % testimonials.length);
  }

  function toggleStoryCard() {
    setIsStoryCardOpen((current) => !current);
  }

  return (
    <main className="home-page">
      <section className="hero-clean">
        <video className="hero-bg-video" autoPlay muted loop playsInline poster={asset('leaves-motion-poster.jpg')} aria-hidden="true">
          <source src={asset('leaves-motion.mp4')} type="video/mp4" />
        </video>
        <div className="hero-copy">
          <p className="kicker">Mentorias, experiências e conversas profundas</p>
          <h1>Há partes suas que ainda esperam ser vistas.</h1>
          <p>E nossa função é mostrar isso. Um espaço para mulheres que desejam viver com mais clareza, presença e verdade.</p>
          <div className="hero-actions">
            <Link className="pill" to="/mentoria.html">Quero começar</Link>
          </div>
        </div>
      </section>

      <section className="split dark connected-photo-section">
        <div className="section-copy">
          <p className="eyebrow">Sua transformação interna</p>
          <h2>começa aqui</h2>
          <p>Mentorias, vivências e práticas para voltar para si, liberar crenças limitantes e transformar desejo em direção.</p>
          <Link className="pill" to="/servicos.html">Conhecer caminhos</Link>
        </div>
        <div className="connected-photo-frame">
          <img src={asset('photo-easel.png')} alt="Mulher em processo criativo" />
        </div>
      </section>

      <section id="luna" className={`intro sage home-luna ${isLunaVisible ? 'is-visible' : ''} ${isStoryCardOpen ? 'is-story-open' : ''}`}>
        <img src={asset('photo-luna-outdoor.png')} alt="Luna em ambiente natural" />
        <div ref={lunaCopyRef} className="luna-copy">
          <span className="luna-flower" style={{ backgroundImage: `url(${flowerFrameSrc})` }} aria-hidden="true" />
          <p className="eyebrow">Olá querida, eu sou a Luna</p>
          <h2>Um universo criado para transformar internamente.</h2>
          <p>Aqui você encontra mentorias, meditação, vivências e propostas para empresas que desejam cuidar de pessoas de forma mais humana.</p>
          <button
            type="button"
            className={`pill small luna-story-trigger ${isStoryCardOpen ? 'is-open' : ''}`}
            onClick={toggleStoryCard}
            aria-expanded={isStoryCardOpen}
            aria-controls="luna-story-card"
          >
            {isStoryCardOpen ? 'Fechar história' : 'Conhecer história'}
          </button>

          <div
            id="luna-story-card"
            className={`luna-story-overlay ${isStoryCardOpen ? 'is-open' : ''}`}
            aria-hidden={!isStoryCardOpen}
            onClick={toggleStoryCard}
          >
            <article
              className={`luna-story-card ${isStoryCardOpen ? 'is-open' : ''}`}
              role="dialog"
              aria-modal="true"
              aria-label="Minha história"
              onClick={(event) => event.stopPropagation()}
            >
              <button type="button" className="luna-story-close" onClick={toggleStoryCard} aria-label="Fechar história">
                ×
              </button>
              <img className="luna-story-photo" src={asset('luna-historia-clean.png')} alt="Luna sorrindo em meio à natureza" />
              <div className="luna-story-text">
                <h3>Minha história</h3>
                <p>
                  Esse espaço é seu para contar quem você é, sua trajetória e como nasceu a missão da Lumine.
                </p>
                <p>
                  Você pode editar esse texto com sua voz pessoal para criar uma conexão ainda mais forte com quem chega aqui.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="offer-grid blue">
        {[
          ['photo-mentoria-luz.png', 'Mentorias individuais', 'Jornadas de transformação em pacotes de 30 ou 61 dias.', '/mentoria.html', 'Conhecer mentoria'],
          ['photo-vivencia.png', 'Vivências', 'Eventos pontuais em Paranavaí e São Paulo.', '/eventos.html', 'Ver eventos'],
          ['testimonial-art.png', 'Aniversários e comemorações', 'Experiências com yoga, pintura, brunch e práticas criadas para celebrar com presença.', '/b2b.html#agendamento', 'Solicitar proposta'],
        ].map(([image, title, text, href, cta]) => (
          <article key={title}>
            <img src={asset(image)} alt={title} />
            <h3>{title}</h3>
            <p>{text}</p>
            <Link className="pill small" to={href}>{cta}</Link>
          </article>
        ))}
      </section>

      <section className="meditation-block">
        <img src={asset('photo-meditation.png')} alt="Meditação em grupo" />
        <div>
          <p className="eyebrow">Meditação</p>
          <h2>Conexão interna para voltar ao corpo.</h2>
          <p>Uma prática guiada para aquietar a mente, usar a respiração como ponto de apoio e cultivar mais calma no cotidiano.</p>
          <Link className="pill" to="/meditacao.html">Conhecer meditação</Link>
        </div>
      </section>

      <section className="testimonials sage">
        <p className="kicker">Depoimentos</p>
        <h2>Mulheres que voltaram para si</h2>
        <div className="testimonial-carousel">
          <button type="button" className="testimonial-arrow" onClick={() => moveTestimonial(-1)} aria-label="Depoimento anterior">{'<'}</button>
          <blockquote className="testimonial-card" key={activeTestimonial} aria-live="polite">
            <div className="testimonial-copy">
              <p>“{currentTestimonial.quote}”</p>
              <cite>{currentTestimonial.author}</cite>
            </div>
            <img className="testimonial-photo" src={asset(currentTestimonial.image)} alt={currentTestimonial.alt} />
          </blockquote>
          <button type="button" className="testimonial-arrow" onClick={() => moveTestimonial(1)} aria-label="Próximo depoimento">{'>'}</button>
        </div>
        <div className="testimonial-dots" aria-label="Selecionar depoimento">
          {testimonials.map((item, index) => (
            <button
              type="button"
              key={item.author}
              className={index === activeTestimonial ? 'is-active' : ''}
              onClick={() => setActiveTestimonial(index)}
              aria-label={`Selecionar depoimento ${index + 1}`}
              aria-current={index === activeTestimonial ? 'true' : undefined}
            />
          ))}
        </div>
      </section>

      <section className="faq blue">
        <h2>Perguntas frequentes</h2>
        <div className="faq-grid">
          <article><h3>Como escolho a mentoria?</h3><p>A conversa inicial ajuda a entender se faz mais sentido uma jornada mensal ou de dois meses.</p></article>
          <article><h3>Os encontros são online?</h3><p>As mentorias são individuais e online. As vivências e eventos acontecem presencialmente por cidade.</p></article>
          <article><h3>Empresas podem contratar?</h3><p>Sim. A Lumine cria propostas para equipes, eventos internos e experiências de cuidado coletivo.</p></article>
        </div>
      </section>
    </main>
  );
}
