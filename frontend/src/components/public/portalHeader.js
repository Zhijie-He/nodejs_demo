import { portalIcon } from '@/components/public/portalIcon.js'

export function createPortalHeader(activePage) {
  return `
    <header class="portal-header">
      <a class="portal-brand" href="#home" aria-label="EU Cottage 首页">
        <span class="portal-brand-symbol">EU</span>
        <span><strong>EU Cottage</strong><small>Innovation Bridge</small></span>
      </a>
      <nav class="portal-nav" aria-label="网站导航">
        <a class="${activePage === 'home' ? 'is-active' : ''}" href="#home">首页</a>
        <a class="${activePage === 'travel' ? 'is-active' : ''}" href="#travel">探索旅程</a>
        <a class="${activePage === 'incubation' ? 'is-active' : ''}" href="#incubation">创业孵化</a>
        <a class="${activePage === 'about' ? 'is-active' : ''}" href="#about">关于我们</a>
      </nav>
      <div class="portal-header-actions">
        <a class="portal-text-link" href="#manage">管理入口</a>
        <a class="portal-button portal-button-small" href="#contact">合作咨询 ${portalIcon('arrow')}</a>
        <button class="portal-menu-button" id="portal-menu-button" type="button" aria-label="打开菜单" aria-expanded="false" aria-controls="portal-mobile-menu">${portalIcon('menu')}</button>
      </div>
    </header>
    <div class="portal-mobile-menu" id="portal-mobile-menu">
      <a href="#home">首页</a>
      <a href="#travel">探索旅程</a>
      <a href="#incubation">创业孵化</a>
      <a href="#about">关于我们</a>
      <a href="#manage">管理入口</a>
    </div>
  `
}

export function bindPortalHeader() {
  const menuButton = document.getElementById('portal-menu-button')
  const mobileMenu = document.getElementById('portal-mobile-menu')

  menuButton?.addEventListener('click', () => {
    mobileMenu.classList.toggle('is-open')
    menuButton.setAttribute('aria-expanded', String(mobileMenu.classList.contains('is-open')))
    menuButton.innerHTML = mobileMenu.classList.contains('is-open')
      ? portalIcon('close')
      : portalIcon('menu')
  })

  mobileMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('is-open'))
  })
}
