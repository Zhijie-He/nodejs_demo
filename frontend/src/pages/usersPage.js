import { getUsers } from '../api/usersApi.js'
import { renderEventsPage } from './eventsPage.js'

export async function renderUsersPage() {
  const app = document.getElementById('app')

  app.innerHTML = '<p>Loading users...</p>'

  try {
    const users = await getUsers()

    app.innerHTML = `
      <h1>用户列表</h1>
      <button id="back-btn" type="button">返回活动页</button>

      <hr>

      ${users.length === 0
        ? '<p>暂无用户</p>'
        : users.map(user => `
          <div style="border:1px solid #ddd; padding:12px; margin:12px;">
            <p>ID：${user.id}</p>
            <p>用户名：${user.username}</p>
            <p>角色：${user.role}</p>
          </div>
        `).join('')
      }
    `

    document.getElementById('back-btn').addEventListener('click', () => {
      renderEventsPage()
    })
  } catch (error) {
    app.innerHTML = `
      <h1>用户列表</h1>
      <p style="color:red;">${error.message}</p>
      <button id="back-btn" type="button">返回活动页</button>
    `

    document.getElementById('back-btn').addEventListener('click', () => {
      renderEventsPage()
    })
  }
}