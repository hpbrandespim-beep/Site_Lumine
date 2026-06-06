import { useSiteContent } from '../hooks/useSiteContent.js';

export default function AgendamentoSection() {
  const { appointment } = useSiteContent();

  function handleContactSubmit(event) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const message = [
      appointment.messageIntro,
      `${appointment.nameLabel}: ${data.get('nome')}`,
      `${appointment.emailLabel}: ${data.get('email')}`,
      `${appointment.phoneLabel}: ${data.get('telefone')}`,
      `${appointment.messageLabel}: ${data.get('mensagem') || appointment.fallbackMessage}`,
    ].join('\n');

    window.open(`https://wa.me/5544984282600?text=${encodeURIComponent(message)}`, '_blank', 'noreferrer');
  }

  return (
    <section className="next-step blush" id="agendamento">
      <div className="next-step-copy appointment-head">
        <p className="kicker">{appointment.kicker}</p>
        <h2>{appointment.title}</h2>
        <p>{appointment.body}</p>
      </div>

      <form className="contact-form" onSubmit={handleContactSubmit}>
        <div className="form-heading">
          <p>{appointment.formLabel}</p>
          <h3>{appointment.formTitle}</h3>
        </div>
        <label>
          <span>{appointment.nameLabel}</span>
          <input name="nome" type="text" autoComplete="name" required />
        </label>
        <div className="form-row">
          <label>
            <span>{appointment.emailLabel}</span>
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label>
            <span>{appointment.phoneLabel}</span>
            <input name="telefone" type="tel" autoComplete="tel" placeholder={appointment.phonePlaceholder} required />
          </label>
        </div>
        <label>
          <span>{appointment.messageLabel}</span>
          <textarea name="mensagem" rows="5" placeholder={appointment.messagePlaceholder} />
        </label>
        <button className="pill" type="submit">{appointment.submitLabel}</button>
      </form>
    </section>
  );
}
