export default function AgendamentoSection() {
  function handleContactSubmit(event) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const message = [
      'Olá, quero conversar sobre meu próximo passo na Lumine.',
      `Nome: ${data.get('nome')}`,
      `E-mail: ${data.get('email')}`,
      `Telefone: ${data.get('telefone')}`,
      `Mensagem: ${data.get('mensagem') || 'Não informado'}`,
    ].join('\n');

    window.open(`https://wa.me/5544984282600?text=${encodeURIComponent(message)}`, '_blank', 'noreferrer');
  }

  return (
    <section className="next-step blush" id="agendamento">
      <div className="next-step-copy appointment-head">
        <p className="kicker">Contato + agendamento</p>
        <h2>Vamos conversar?</h2>
        <p>Preencha seus dados e conte brevemente o que te trouxe até aqui. A Luna responde pelo WhatsApp em até 48 horas úteis.</p>
      </div>

      <form className="contact-form" onSubmit={handleContactSubmit}>
        <div className="form-heading">
          <p>Agendamento</p>
          <h3>Seus dados</h3>
        </div>
        <label>
          <span>Nome</span>
          <input name="nome" type="text" autoComplete="name" required />
        </label>
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
          <span>Mensagem</span>
          <textarea name="mensagem" rows="5" placeholder="Conte brevemente o que te trouxe até aqui..." />
        </label>
        <button className="pill" type="submit">Enviar pelo WhatsApp</button>
      </form>
    </section>
  );
}
