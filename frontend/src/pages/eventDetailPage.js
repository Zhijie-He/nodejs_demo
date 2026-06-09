import {
  getEventById,
  deleteEvent
} from '../api/eventsApi.js'

import { renderEventsPage } from './eventsPage.js'

export async function renderEventDetailPage(id) {
  const app = document.getElementById('app')
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))

  app.innerHTML = '<p>Loading event...</p>'

  try {
    const event = await getEventById(id)
    const canManage = currentUser.role === 'admin' || event.user_id === currentUser.id

    app.innerHTML = `
      <h1>${event.title}</h1>

      <p>城市：${event.city}</p>
      <p>日期：${event.date}</p>
      <p>创建者 ID：${event.user_id}</p>
      ${canManage
        ? '<button id="delete-btn" type="button">删除活动</button>'
        : ''
      }
      <button id="back-btn" type="button">返回列表</button>
    `

    // delete related
    const deleteButton = document.getElementById('delete-btn')
    if (deleteButton) {
      deleteButton.addEventListener('click', async () => {
        const confirmed = confirm('确定要删除这个活动吗？')

        if (!confirmed) {
          return
        }

        try {
          await deleteEvent(id)
          renderEventsPage()
        } catch (error) {
          alert(error.message)
        }
      })
    }

    document.getElementById('back-btn').addEventListener('click', () => {
      renderEventsPage()
    })
  } catch (error) {
    app.innerHTML = `
      <h1>活动详情</h1>
      <p style="color:red;">${error.message}</p>
      <button id="back-btn" type="button">返回列表</button>
    `

    document.getElementById('back-btn').addEventListener('click', () => {
      renderEventsPage()
    })
  }
}