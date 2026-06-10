import { getEventById, deleteEvent } from '@/api/eventsApi.js'
import { createAppHeader, createErrorState, createLoadingState } from '@/components/management/layout.js'
import { escapeHtml, formatEventDate } from '@/utils/html.js'
import { renderEventsPage } from '@/pages/management/eventsPage.js'
import { renderLoginPage } from '@/pages/management/loginPage.js'
import { renderUsersPage } from '@/pages/management/usersPage.js'

export async function renderEventDetailPage(id) {
  const app = document.getElementById('app')
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  app.innerHTML = createLoadingState('正在打开活动')

  try {
    const event = await getEventById(id)
    const canManage = currentUser.role === 'admin' || event.user_id === currentUser.id

    app.innerHTML = `
      ${createAppHeader(currentUser, 'events')}
      <main class="page-shell compact-shell">
        <button class="back-link" id="back-btn" type="button">
          <svg viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></svg>
          返回活动列表
        </button>

        <article class="detail-hero">
          <div class="detail-orb detail-orb-one"></div>
          <div class="detail-orb detail-orb-two"></div>
          <div class="detail-copy">
            <span class="detail-kicker">EventFlow 精选活动 · #${event.id}</span>
            <h1>${escapeHtml(event.title)}</h1>
            <p>${escapeHtml(event.subtitle || '一次值得期待的相聚，准备好认识新的伙伴了吗？')}</p>
          </div>
          <div class="detail-meta-grid">
            <div class="detail-meta">
              <span>举办城市</span>
              <strong>${escapeHtml(event.city)}</strong>
            </div>
            <div class="detail-meta">
              <span>活动日期</span>
              <strong>${escapeHtml(formatEventDate(event.date))}</strong>
            </div>
            <div class="detail-meta">
              <span>创建者编号</span>
              <strong>#${event.user_id}</strong>
            </div>
          </div>
        </article>

        <section class="detail-actions">
          <div>
            <span class="eyebrow">准备参加</span>
            <h2>把这一天留给新的体验</h2>
          </div>
          ${canManage
            ? '<button class="button button-danger" id="delete-btn" type="button">删除活动</button>'
            : '<span class="role-pill role-user">公开活动</span>'
          }
        </section>
      </main>
    `

    document.getElementById('back-btn').addEventListener('click', renderEventsPage)
    document.getElementById('events-nav-btn').addEventListener('click', renderEventsPage)
    document.getElementById('users-btn')?.addEventListener('click', renderUsersPage)
    document.getElementById('logout-btn').addEventListener('click', () => {
      localStorage.removeItem('token')
      localStorage.removeItem('currentUser')
      renderLoginPage()
    })

    document.getElementById('delete-btn')?.addEventListener('click', async () => {
      if (!confirm('确定要删除这个活动吗？此操作无法撤销。')) {
        return
      }

      try {
        await deleteEvent(id)
        renderEventsPage()
      } catch (error) {
        alert(error.message)
      }
    })
  } catch (error) {
    app.innerHTML = createErrorState('活动详情加载失败', error.message)
  }
}
