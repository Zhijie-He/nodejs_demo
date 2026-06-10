import { getUsers } from '@/api/usersApi.js'
import { createAppHeader, createErrorState, createLoadingState } from '@/components/management/layout.js'
import { escapeHtml } from '@/utils/html.js'
import { renderEventsPage } from '@/pages/management/eventsPage.js'
import { renderLoginPage } from '@/pages/management/loginPage.js'

export async function renderUsersPage() {
  const app = document.getElementById('app')
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  app.innerHTML = createLoadingState('正在加载用户')

  try {
    const users = await getUsers()

    app.innerHTML = `
      ${createAppHeader(currentUser, 'users')}
      <main class="page-shell compact-shell">
        <section class="page-title-row">
          <div>
            <span class="eyebrow">成员管理</span>
            <h1>用户列表</h1>
            <p>查看当前平台注册用户及其权限。</p>
          </div>
          <button class="button button-dark" id="back-btn" type="button">返回活动</button>
        </section>

        <section class="table-panel">
          <div class="table-heading">
            <h2>全部成员</h2>
            <span class="result-count">${users.length} 位用户</span>
          </div>
          <div class="user-table">
            <div class="table-row table-header">
              <span>用户</span><span>用户 ID</span><span>角色</span>
            </div>
            ${users.map(user => `
              <div class="table-row">
                <div class="user-cell">
                  <span class="avatar">${escapeHtml(user.username.slice(0, 1).toUpperCase())}</span>
                  <strong>${escapeHtml(user.username)}</strong>
                </div>
                <span class="muted-text">#${user.id}</span>
                <span><i class="role-pill role-${user.role}">${user.role === 'admin' ? '管理员' : '成员'}</i></span>
              </div>
            `).join('')}
          </div>
        </section>
      </main>
    `

    document.getElementById('back-btn').addEventListener('click', renderEventsPage)
    document.getElementById('events-nav-btn').addEventListener('click', renderEventsPage)
    document.getElementById('logout-btn').addEventListener('click', () => {
      localStorage.removeItem('token')
      localStorage.removeItem('currentUser')
      renderLoginPage()
    })
  } catch (error) {
    app.innerHTML = createErrorState('用户加载失败', error.message)
  }
}
