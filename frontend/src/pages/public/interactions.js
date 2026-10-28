let dispose = () => {}

export function enhancePortal(page, isEnglish) {
  dispose()
  const root = document.querySelector('.trip-site')
  const controller = new AbortController()
  const { signal } = controller
  const reduced = matchMedia('(prefers-reduced-motion: reduce)')
  const behavior = () => reduced.matches ? 'instant' : 'smooth'
  const observers = []
  let frame = 0
  const text = (zh, en) => isEnglish ? en : zh
  const longPage = ['home', 'journey-2026', 'journey-2027'].includes(page)
  const progress = document.createElement('div')
  progress.className = 'reading-progress'
  progress.setAttribute('aria-hidden', 'true')
  root.prepend(progress)
  const top = document.createElement('button')
  top.className = 'back-to-top'
  top.type = 'button'
  top.hidden = true
  top.setAttribute('aria-label', text('返回顶部', 'Back to top'))
  top.innerHTML = '<span aria-hidden="true">↑</span>'
  top.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: behavior() })
    const heading = root.querySelector('h1')
    heading?.setAttribute('tabindex', '-1')
    heading?.focus({ preventScroll: true })
  }, { signal })
  root.append(top)
  const update = () => {
    frame = 0
    const distance = document.documentElement.scrollHeight - innerHeight
    progress.style.transform = `scaleX(${distance > 0 ? Math.min(1, Math.max(0, scrollY / distance)) : 0})`
    top.hidden = scrollY < 600
  }
  const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
  window.addEventListener('scroll', schedule, { passive: true, signal })
  window.addEventListener('resize', schedule, { passive: true, signal })
  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(schedule)
    observer.observe(root)
    observers.push(observer)
  }
  if (longPage) {
    const candidates = page === 'home'
      ? [['.signature-section','项目特色','The experience'],['.journey-directory','选择旅程','Journeys'],['.home-preview','2027概览','2027 overview'],['.home-questions','常见问题','FAQs']]
      : [['.recap-highlights','活动亮点','Highlights'],['.route-chapters','路线概览','Route overview'],['.itinerary-section','每日行程','Daily programme'],['.technology-gallery','企业介绍','Companies'],['.salon-panel','创新沙龙','Innovation salon'],['.practical','费用与安排','Practical details']]
    const nav = document.createElement('nav')
    nav.className = 'section-navigation'
    nav.hidden = true
    nav.setAttribute('aria-label', text('本页导航', 'On this page'))
    const brand = document.createElement('a')
    brand.className = 'section-nav-brand'
    brand.href = '#home'
    brand.textContent = 'EU Cottage'
    brand.setAttribute('aria-label', text('EU Cottage 首页', 'EU Cottage home'))
    nav.append(brand)
    const entries = candidates.map(([selector, zh, en], i) => {
      const section = root.querySelector(selector)
      if (!section) return null
      section.id = `section-${page}-${i}`
      const button = document.createElement('button')
      button.type = 'button'
      button.textContent = text(zh, en)
      button.setAttribute('aria-controls', section.id)
      button.addEventListener('click', () => {
        section.scrollIntoView({ behavior: behavior(), block: 'start' })
        const heading = section.querySelector('h2')
        heading?.setAttribute('tabindex', '-1')
        heading?.focus({ preventScroll: true })
      }, { signal })
      nav.append(button)
      return { section, button }
    }).filter(Boolean)
    const anchor = root.querySelector('main > section')
    anchor?.after(nav)
    const updateCurrent = () => {
      nav.hidden = !anchor || anchor.getBoundingClientRect().bottom > 0
      let active = null
      for (const item of entries) if (item.section.getBoundingClientRect().top <= 160) active = item
      for (const item of entries) {
        if (item === active) item.button.setAttribute('aria-current', 'location')
        else item.button.removeAttribute('aria-current')
      }
    }
    window.addEventListener('scroll', updateCurrent, { passive: true, signal })
    window.addEventListener('resize', updateCurrent, { passive: true, signal })
    updateCurrent()
  }
  if (!reduced.matches && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) { target.classList.add('is-revealed'); observer.unobserve(target) }
      })
    }, { threshold: 0.08 })
    root.querySelectorAll('.signature-grid article,.journey-edition,.chapter-grid article,.recap-grid article,.technology-grid article').forEach(element => {
      element.classList.add('reveal-item')
      observer.observe(element)
    })
    observers.push(observer)
    root.addEventListener('focusin', event => event.target.closest('.reveal-item')?.classList.add('is-revealed'), { signal })
  }
  const showAll = () => { if (reduced.matches) root.querySelectorAll('.reveal-item').forEach(el => el.classList.add('is-revealed')) }
  reduced.addEventListener('change', showAll, { signal })
  update()
  dispose = () => {
    controller.abort()
    observers.forEach(observer => observer.disconnect())
    cancelAnimationFrame(frame)
  }
  window.addEventListener('hashchange', () => dispose(), { once: true, signal })
}
