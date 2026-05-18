import { useEffect } from 'react'
import { LinkedInIcon, GitHubIcon, InstagramIcon } from './Icons'

function Footer() {
  useEffect(() => {
    const yearEl = document.getElementById('year')
    if (yearEl) {
      yearEl.textContent = String(new Date().getFullYear())
    }
  }, [])

  return (
    <footer className="site-footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <img
            src={`${import.meta.env.BASE_URL}logo.png`}
            alt="WaveSync"
            className="footer__logo-img"
            width="34"
            height="34"
            loading="lazy"
          />
          <span className="footer__name">WaveSync Technology</span>
        </div>
        <p className="footer__rights">
          &copy; <span id="year"></span> WaveSync Technology. Todos os direitos reservados.
        </p>
        <ul className="footer__social" aria-label="Redes sociais">
          <li>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <LinkedInIcon />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/wavesync.tech?igsh=a3dmcmZxYnNtaGdq&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <InstagramIcon />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
