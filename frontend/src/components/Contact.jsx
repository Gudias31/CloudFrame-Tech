import { WhatsAppIcon } from './Icons'

function Contact() {
  return (
    <section id="contato" className="section section--cta" aria-labelledby="cta-title">
      <div className="container">
        <div className="cta-banner glass-card-strong reveal" data-reveal>
          <div className="cta-banner__content">
            <h2 id="cta-title" className="cta-banner__title">Pronto para elevar sua presença digital?</h2>
            <p className="cta-banner__text">
              Conte-nos sobre seu projeto. Respondemos com uma proposta clara, prazos realistas e um roadmap técnico que faz sentido para o seu negócio.
            </p>
          </div>
          <div className="cta-banner__actions">
            <a 
              href="https://wa.me/5511969360932?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20um%20or%C3%A7amento%20com%20a%20WaveSync%20Technology." 
              className="btn btn--whatsapp" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <WhatsAppIcon />
              <span>Falar no WhatsApp</span>
            </a>
            <a href="mailto:wavesynctechnology.com>" className="btn btn--ghost btn--ghost-light">
              email@wavesync.tech
            </a> 
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
