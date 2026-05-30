import { Link } from 'react-router-dom';
import { asset } from '../data/site.js';

export default function Home() {
  function handleContactSubmit(event) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const message = [
      'Olá, quero conversar sobre meu próximo passo na Lumine.',
      `Nome: ${data.get('nome')} ${data.get('sobrenome')}`,
      `E-mail: ${data.get('email')}`,
      `Telefone: ${data.get('telefone')}`,
      `Interesse: ${data.get('interesse')}`,
      `Mensagem: ${data.get('mensagem') || 'Não informado'}`,
    ].join('\n');

    window.open(`https://wa.me/5544984282600?text=${encodeURIComponent(message)}`, '_blank', 'noreferrer');
  }

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

      <section className="next-step blush" id="agendamento">
        <div className="next-step-copy">
          <p className="kicker">Contato + agendamento</p>
          <h2>Vamos conversar sobre o seu próximo passo?</h2>
          <p>Preencha o formulário abaixo. A Luna responde em até 48 horas úteis e, se quiser, você confirma tudo pelo WhatsApp.</p>
          <ul className="next-step-list">
            <li>Conversa inicial sem compromisso</li>
            <li>Mentorias online e vivências presenciais</li>
            <li>Meditação para compra e propostas para empresas</li>
          </ul>
          <div className="path-links" aria-label="Caminhos principais da Lumine">
            <Link to="/mentoria.html">Mentoria</Link>
            <Link to="/meditacao.html">Meditação</Link>
            <Link to="/b2b.html">B2B</Link>
            <Link to="/eventos.html#paranavai">Paranavaí</Link>
            <Link to="/eventos.html#sao-paulo">São Paulo</Link>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleContactSubmit}>
          <div className="form-row">
            <label>
              <span>Nome</span>
              <input name="nome" type="text" autoComplete="given-name" required />
            </label>
            <label>
              <span>Sobrenome</span>
              <input name="sobrenome" type="text" autoComplete="family-name" required />
            </label>
          </div>
          <div className="form-row">
            <label>
              <span>E-mail</span>
              <input name="email" type="email" autoComplete="email" required />
            </label>
            <label>
              <span>Telefone / WhatsApp</span>
              <input name="telefone" type="tel" autoComplete="tel" placeholder="(44) 99999-9999" required />
            </label>
          </div>
          <label>
            <span>O que você busca?</span>
            <select name="interesse" defaultValue="" required>
              <option value="" disabled>Selecione uma opção</option>
              <option>Mentoria individual</option>
              <option>Comprar meditação</option>
              <option>Eventos em Paranavaí</option>
              <option>Eventos em São Paulo</option>
              <option>Proposta para empresa</option>
            </select>
          </label>
          <label>
            <span>Mensagem</span>
            <textarea name="mensagem" rows="5" placeholder="Conte brevemente o que te trouxe até aqui..." />
          </label>
          <button className="pill" type="submit">Enviar solicitação</button>
        </form>
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
