import { useEffect, useRef } from 'react'

function Header({ navOpen, setNavOpen }) {
  const navRef = useRef(null)
  const headerRef = useRef(null)

  const handleNavToggle = () => {
    setNavOpen(!navOpen)
  }

  const closeNav = () => {
    setNavOpen(false)
  }

  const handleSmoothScroll = (e) => {
    const anchor = e.target.closest('a[href^="#"]')
    if (!anchor || anchor.getAttribute('href') === '#') return
    
    const id = anchor.getAttribute('href').slice(1)
    const target = document.getElementById(id)
    if (!target) return
    
    e.preventDefault()
    const headerH = headerRef.current ? headerRef.current.offsetHeight : 0
    const top = target.getBoundingClientRect().top + window.scrollY - headerH - 12
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({
      top: Math.max(0, top),
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    })
    closeNav()
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeNav()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    const navBar = navRef.current
    if (!navBar) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const handleScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop
      navBar.style.boxShadow =
        y > 24
          ? '0 12px 48px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)'
          : '0 8px 40px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.documentElement.addEventListener('click', handleSmoothScroll)
    return () => document.documentElement.removeEventListener('click', handleSmoothScroll)
  }, [])

  return (
    <header className="site-header" ref={headerRef}>
      <nav 
        ref={navRef}
        className={`nav glass-nav ${navOpen ? 'is-open' : ''}`} 
        aria-label="Principal"
      >
        <a href="#topo" className="nav__brand">
          <img
            src={`${import.meta.env.BASE_URL}logo.png`}
            alt="WaveSync"
            className="nav__logo-img"
            width="34"
            height="34"
          />
          <span className="nav__name">WaveSync<span className="nav__dot">.</span></span>
        </a>
        <button 
          type="button" 
          className="nav__toggle" 
          aria-expanded={navOpen} 
          aria-controls="nav-menu" 
          aria-label="Abrir menu"
          onClick={handleNavToggle}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul id="nav-menu" className="nav__links">
          <li><a href="#sobre" onClick={closeNav}>Sobre</a></li>
          <li><a href="#servicos" onClick={closeNav}>Serviços</a></li>
          <li><a href="#diferenciais" onClick={closeNav}>Diferenciais</a></li>
          {/* <li><a href="#portfolio" onClick={closeNav}>Portfólio</a></li> */}
          <li><a href="#contato" className="nav__cta" onClick={closeNav}>Contato</a></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
