import { Link } from 'react-router-dom';
import { asset } from '../data/site.js';

export default function Home() {
  return (
    <main>
      <section className="hero-clean">
        <div className="hero-copy">
          <p className="kicker">Mentorias, experiências e conversas profundas</p>
          <h1>Há partes suas que ainda esperam ser vistas.</h1>
          <p>E nossa função é mostrar isso. Um espaço para mulheres que desejam viver com mais clareza, presença e verdade.</p>
          <div className="hero-actions">
            <Link className="pill" to="/mentoria.html">Quero me reconectar</Link>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <img className="leaf" src={asset('leaves-side.png')} alt="" />
          <img className="portrait" src={asset('photo-easel.png')} alt="" />
          <div className="hero-note"><strong>Respira</strong><span>sente</span><strong>transforma</strong></div>
        </div>
      </section>

      <section className="split dark">
        <div className="section-copy">
          <p className="eyebrow">Sua transformação interna</p>
          <h2>começa aqui</h2>
          <p>Mentorias, vivências e práticas para voltar para si, liberar crenças limitantes e transformar desejo em direção.</p>
          <Link className="pill" to="/servicos.html">Conheça os caminhos</Link>
        </div>
        <img src={asset('photo-easel.png')} alt="Mulher em processo criativo" />
      </section>

      <section className="intro sage">
        <img src={asset('photo-luna-outdoor.png')} alt="Luna em ambiente natural" />
        <div>
          <p className="eyebrow">Olá querida, eu sou a Luna</p>
          <h2>Um universo criado para transformar internamente.</h2>
          <p>Aqui você encontra mentorias, meditação, vivências e propostas para empresas que desejam cuidar de pessoas de forma mais humana.</p>
        </div>
      </section>

      <section className="offer-grid blue">
        {[
          ['photo-mentoria-luz.png', 'Mentorias individuais', 'Jornadas de transformação em pacotes de 30 ou 61 dias.', '/mentoria.html', 'Mentoria'],
          ['photo-vivencia.png', 'Vivências', 'Eventos pontuais em Paranavaí e São Paulo.', '/eventos.html', 'Eventos'],
          ['photo-retiro.png', 'Retiros', 'Experiências para pausar, respirar e se reencontrar.', '/eventos.html', 'Ver datas'],
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
          <Link className="pill" to="/meditacao.html">Quero me sentir mais calma</Link>
        </div>
      </section>

      <section className="testimonials sage">
        <h2>Depoimentos</h2>
        <div className="quotes">
          <blockquote>“Me senti de volta comigo mesma, principalmente na questão da jardinagem que pude fazer.”</blockquote>
          <blockquote>“Senti que tudo foi escolhido nos pequenos detalhes e isso contribuiu para a experiência.”</blockquote>
          <blockquote>“Depois que conheci a Lumine, passei a adorar fazer atividades em grupo.”</blockquote>
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
