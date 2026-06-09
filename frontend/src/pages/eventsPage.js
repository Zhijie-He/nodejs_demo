import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent
} from '../api/eventsApi.js'

import { createEventCard } from '../components/eventCard.js'
import { renderEventDetailPage } from './eventDetailPage.js'
import { renderLoginPage } from './loginPage.js'
import { renderUsersPage } from './usersPage.js'

export async function renderEventsPage(filters = {}) {
  const app = document.getElementById('app')
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))

  app.innerHTML = '<p>Loading events...</p>'

  try {
    const events = await getEvents(filters)

    app.innerHTML = `
      <h1>活动列表</h1>
      <p>当前用户：${currentUser.username}（${currentUser.role}）</p>
      <button id="logout-btn" type="button">退出登录</button>

      ${currentUser.role === 'admin'
        ? '<button id="users-btn" type="button">用户管理</button>'
        : ''
      }

      <form id="event-form">
        <input id="title" placeholder="活动名称">
        <input id="city" placeholder="城市">
        <input id="date" type="date">
        <button id="submit-btn" type="submit">创建活动</button>
        <button id="cancel-btn" type="button" style="display:none;">取消编辑</button>
      </form>

      <input id="search-city" placeholder="按城市搜索" value="${filters.city || ''}">
      <input id="search-date" type="date" value="${filters.date || ''}">
      <button id="search-btn" type="button">搜索</button>
      <button id="reset-btn" type="button">重置</button>

      <hr>

      <div id="event-list">
        ${events.length === 0
          ? '<p>暂无活动</p>'
          : events.map(event => createEventCard(event, currentUser)).join('')
        }
      </div>
    `
    
    const form = document.getElementById('event-form')
    form.addEventListener('submit', async (e) => {
      e.preventDefault()

      const title = document.getElementById('title').value.trim()
      const city = document.getElementById('city').value.trim()
      const date = document.getElementById('date').value

      if (!title || !city || !date) {
        alert('请填写完整信息')
        return
      }

      const editingId = form.dataset.editingId
      try {
        if (editingId) {
          await updateEvent(editingId, { title, city, date })
          delete form.dataset.editingId
          document.getElementById('submit-btn').textContent = '创建活动'
        } else {
          await createEvent({ title, city, date })
        }

        renderEventsPage()
      } catch (error) {
        alert(error.message)
      }
    })

    const usersButton = document.getElementById('users-btn')
    if (usersButton) {
      usersButton.addEventListener('click', () => {
        renderUsersPage()
      })
    }

    const logoutButton = document.getElementById('logout-btn')
    logoutButton.addEventListener('click', () => {
      localStorage.removeItem('token')
      localStorage.removeItem('currentUser')
      renderLoginPage()
    })

    // search related
    const searchInput = document.getElementById('search-city')
    const searchDateInput = document.getElementById('search-date')
    const searchButton = document.getElementById('search-btn')
    const resetButton = document.getElementById('reset-btn')
    searchButton.addEventListener('click', () => {
      const city = searchInput.value.trim()
      const date = searchDateInput.value
      if (!city && !date) {
        alert('请填写搜索条件')
        return
      }

      renderEventsPage({ city, date })
    })

    resetButton.addEventListener('click', () => {
      renderEventsPage()
    })

    // edit
    const editButtons = document.querySelectorAll('.edit-btn')
    editButtons.forEach(button => {
      button.addEventListener('click', () => {
        const id = Number(button.dataset.id)
        const event = events.find(item => item.id === id)

        document.getElementById('title').value = event.title
        document.getElementById('city').value = event.city
        document.getElementById('date').value = event.date

        form.dataset.editingId = id
        document.getElementById('submit-btn').textContent = '保存修改'
        document.getElementById('cancel-btn').style.display = 'inline-block'
      })
    })

    // cancel
    const cancelButton = document.getElementById('cancel-btn')
    cancelButton.addEventListener('click', () => {
      document.getElementById('title').value = ''
      document.getElementById('city').value = ''
      document.getElementById('date').value = ''

      delete form.dataset.editingId
      document.getElementById('submit-btn').textContent = '创建活动'
      cancelButton.style.display = 'none'
    })

    // delete
    const deleteButtons = document.querySelectorAll('.delete-btn')
    deleteButtons.forEach(button => {
      button.addEventListener('click', async () => {
        const id = button.dataset.id
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
    })

    const detailButtons = document.querySelectorAll('.detail-btn')
    detailButtons.forEach(button => {
      button.addEventListener('click', () => {
        const id = button.dataset.id
        renderEventDetailPage(id)
      })
    })

  } catch (error) {
    app.innerHTML = `
      <h1>活动列表</h1>
      <p style="color:red;">加载失败：${error.message}</p>
    `
  }
}