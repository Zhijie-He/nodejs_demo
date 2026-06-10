import { escapeHtml } from '@/utils/html.js'

export function createBrand() {
  return `
    <div class="brand">
      <span class="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="M5 17.5 12 4l7 13.5-7-3.2-7 3.2Z"/><path d="m8.4 16 3.6 4 3.6-4"/></svg>
      </span>
      <span class="brand-name">Event<span>Flow</span></span>
    </div>
  `
}

export function createAppHeader(currentUser, activePage = 'events') {
  const initial = escapeHtml(currentUser.username.slice(0, 1).toUpperCase())

  return `
    <header class="app-header">
      <div class="header-inner">
        ${createBrand()}
        <nav class="main-nav" aria-label="主要导航">
          <button class="nav-link ${activePage === 'events' ? 'is-active' : ''}" id="events-nav-btn" type="button">活动</button>
          ${currentUser.role === 'admin'
            ? `<button class="nav-link ${activePage === 'users' ? 'is-active' : ''}" id="users-btn" type="button">用户</button>`
            : ''
          }
        </nav>
        <div class="account-area">
          <div class="avatar">${initial}</div>
          <div class="account-copy">
            <strong>${escapeHtml(currentUser.username)}</strong>
            <span>${currentUser.role === 'admin' ? '管理员' : '成员'}</span>
          </div>
          <button class="icon-button" id="logout-btn" type="button" title="退出登录" aria-label="退出登录">
            <svg viewBox="0 0 24 24"><path d="M10 17l5-5-5-5M15 12H3M14 4h5a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-5"/></svg>
          </button>
        </div>
      </div>
    </header>
  `
}

export function createLoadingState(message = '正在加载') {
  return `
    <main class="center-state">
      <div class="loader" aria-hidden="true"></div>
      <p>${escapeHtml(message)}</p>
    </main>
  `
}

export function createErrorState(title, message) {
  return `
    <main class="center-state">
      <div class="state-icon state-icon-error">!</div>
      <h1>${escapeHtml(title)}</h1>
      <p>${escapeHtml(message)}</p>
    </main>
  `
}
