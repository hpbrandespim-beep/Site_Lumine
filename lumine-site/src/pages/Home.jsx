import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { asset } from '../data/site.js';
import { useSiteContent } from '../hooks/useSiteContent.js';

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
  const content = useSiteContent();
  const homeContent = content.home;
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isLunaVisible, setIsLunaVisible] = useState(false);
  const [flowerFrame, setFlowerFrame] = useState(1);
  const [isStoryCardOpen, setIsStoryCardOpen] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => (
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ));
  const lunaCopyRef = useRef(null);
  const lunaVisibleRef = useRef(false);
  const flowerRafRef = useRef(0);

  const currentTestimonial = testimonials[activeTestimonial];
  const flowerFrameSrc = asset(`flower-seq-40/frame-${String(prefersReducedMotion ? 40 : flowerFrame).padStart(2, '0')}.png`);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);

    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveTestimonial((current) => (current + 1) % testimonials.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const maxFrame = 40;
    const preloaded = [];
    const preloadFrames = () => {
      for (let index = 1; index <= maxFrame; index += 1) {
        const image = new window.Image();
        image.src = asset(`flower-seq-40/frame-${String(index).padStart(2, '0')}.png`);
        preloaded.push(image);
      }
    };

    if (prefersReducedMotion) return undefined;

    let idleId = 0;
    let timeoutId = 0;

    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(preloadFrames, { timeout: 1800 });
    } else {
      timeoutId = window.setTimeout(preloadFrames, 900);
    }

    return () => {
      if (idleId) window.cancelIdleCallback(idleId);
      if (timeoutId) window.clearTimeout(timeoutId);
      preloaded.length = 0;
    };
  }, [prefersReducedMotion]);

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

    if (prefersReducedMotion) {
      setFlowerFrame(maxFrame);
      return undefined;
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
  }, [isLunaVisible, prefersReducedMotion]);

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
        {!prefersReducedMotion && (
          <video className="hero-bg-video" autoPlay muted loop playsInline preload="metadata" poster={asset('leaves-motion-poster.jpg')} aria-hidden="true">
            <source src={asset('leaves-motion.mp4')} type="video/mp4" />
          </video>
        )}
        <div className="hero-copy">
          <p className="kicker">{homeContent.hero.kicker}</p>
          <h1>{homeContent.hero.title}</h1>
          <p>{homeContent.hero.body}</p>
          <div className="hero-actions">
            <Link className="pill" to="/mentoria.html">{homeContent.hero.cta}</Link>
          </div>
        </div>
      </section>

      <section className="split dark connected-photo-section">
        <div className="section-copy">
          <p className="eyebrow">{homeContent.transformation.eyebrow}</p>
          <h2>{homeContent.transformation.title}</h2>
          <p>{homeContent.transformation.body}</p>
          <Link className="pill" to="/servicos.html">{homeContent.transformation.cta}</Link>
        </div>
        <div className="connected-photo-frame">
          <img src={asset('photo-easel.png')} alt="Mulher em processo criativo" loading="lazy" decoding="async" />
        </div>
      </section>

      <section id="luna" className={`intro sage home-luna ${isLunaVisible ? 'is-visible' : ''} ${isStoryCardOpen ? 'is-story-open' : ''}`}>
        <img src={asset('photo-luna-outdoor.png')} alt="Luna em ambiente natural" loading="lazy" decoding="async" />
        <div ref={lunaCopyRef} className="luna-copy">
          <span className="luna-flower" style={{ backgroundImage: `url(${flowerFrameSrc})` }} aria-hidden="true" />
          <p className="eyebrow">{homeContent.luna.eyebrow}</p>
          <h2>{homeContent.luna.title}</h2>
          <p>{homeContent.luna.body}</p>
          <button
            type="button"
            className={`pill small luna-story-trigger ${isStoryCardOpen ? 'is-open' : ''}`}
            onClick={toggleStoryCard}
            aria-expanded={isStoryCardOpen}
            aria-controls="luna-story-card"
          >
            {isStoryCardOpen ? homeContent.luna.storyCloseLabel : homeContent.luna.storyOpenLabel}
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
              <img className="luna-story-photo" src={asset('luna-historia-clean.png')} alt="Luna sorrindo em meio à natureza" loading="lazy" decoding="async" />
              <div className="luna-story-text">
                <h3>{homeContent.story.title}</h3>
                {homeContent.story.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
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
            <img src={asset(image)} alt={title} loading="lazy" decoding="async" />
            <h3>{title}</h3>
            <p>{text}</p>
            <Link className="pill small" to={href}>{cta}</Link>
          </article>
        ))}
      </section>

      <section className="meditation-block">
        <img src={asset('photo-meditation.png')} alt="Meditação em grupo" loading="lazy" decoding="async" />
        <div>
          <p className="eyebrow">{homeContent.meditation.eyebrow}</p>
          <h2>{homeContent.meditation.title}</h2>
          <p>{homeContent.meditation.body}</p>
          <Link className="pill" to="/meditacao.html">{homeContent.meditation.cta}</Link>
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
            <img className="testimonial-photo" src={asset(currentTestimonial.image)} alt={currentTestimonial.alt} loading="lazy" decoding="async" />
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
        <h2>{homeContent.faq.title}</h2>
        <div className="faq-grid">
          {homeContent.faq.items.map((item) => (
            <article key={item.title}><h3>{item.title}</h3><p>{item.body}</p></article>
          ))}
        </div>
      </section>
    </main>
  );
}
