import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent
} from '@/api/eventsApi.js'
import { createEventCard } from '@/components/management/eventCard.js'
import { createEventForm } from '@/components/management/eventForm.js'
import { createEventFilters } from '@/components/management/eventFilters.js'
import { createAppHeader, createErrorState, createLoadingState } from '@/components/management/layout.js'
import { renderEventDetailPage } from '@/pages/management/eventDetailPage.js'
import { renderLoginPage } from '@/pages/management/loginPage.js'
import { renderUsersPage } from '@/pages/management/usersPage.js'

function showToast(message, type = 'success') {
  const existingToast = document.querySelector('.toast')
  existingToast?.remove()

  const toast = document.createElement('div')
  toast.className = `toast toast-${type}`
  toast.textContent = message
  document.body.appendChild(toast)

  window.setTimeout(() => toast.remove(), 3200)
}

export async function renderEventsPage(filters = {}) {
  const app = document.getElementById('app')
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))

  app.innerHTML = createLoadingState('正在整理活动')

  try {
    const events = await getEvents(filters)
    const managedEvents = events.filter(event =>
      currentUser.role === 'admin' || event.user_id === currentUser.id
    ).length

    app.innerHTML = `
      ${createAppHeader(currentUser, 'events')}
      <main class="page-shell">
        <section class="hero">
          <div class="hero-copy">
            <span class="eyebrow">活动工作台</span>
            <h1>把好点子，变成<br><span>值得参加的活动。</span></h1>
            <p>创建、发现和管理你身边正在发生的精彩活动。</p>
          </div>
          <div class="hero-stats">
            <div class="stat-card">
              <span>当前活动</span>
              <strong>${events.length}</strong>
              <small>场活动等待探索</small>
            </div>
            <div class="stat-card stat-card-accent">
              <span>我的管理</span>
              <strong>${managedEvents}</strong>
              <small>场活动可由你编辑</small>
            </div>
          </div>
        </section>

        <section class="workspace-grid">
          ${createEventForm()}

          <div class="events-area">
            <div class="section-heading">
              <div>
                <span class="eyebrow">发现活动</span>
                <h2>${filters.city || filters.date ? '筛选结果' : '最近发布'}</h2>
              </div>
              <span class="result-count">${events.length} 个活动</span>
            </div>

            ${createEventFilters(filters)}

            <div class="event-list" id="event-list">
              ${events.length === 0
                ? `
                  <div class="empty-state">
                    <div class="state-icon">+</div>
                    <h3>还没有找到活动</h3>
                    <p>换个搜索条件，或者创建第一个活动。</p>
                  </div>
                `
                : events.map((event, index) => createEventCard(event, currentUser, index)).join('')
              }
            </div>
          </div>
        </section>
      </main>
    `

    const form = document.getElementById('event-form')
    const titleInput = document.getElementById('title')
    const subtitleInput = document.getElementById('subtitle')
    const cityInput = document.getElementById('city')
    const dateInput = document.getElementById('date')
    const submitButton = document.getElementById('submit-btn')
    const cancelButton = document.getElementById('cancel-btn')
    const formTitle = document.getElementById('form-title')

    form.addEventListener('submit', async event => {
      event.preventDefault()

      const title = titleInput.value.trim()
      const subtitle = subtitleInput.value.trim()
      const city = cityInput.value.trim()
      const date = dateInput.value

      if (!title || !subtitle || !city || !date) {
        showToast('请填写完整的活动信息', 'error')
        return
      }

      submitButton.disabled = true
      submitButton.textContent = form.dataset.editingId ? '正在保存...' : '正在创建...'

      try {
        if (form.dataset.editingId) {
          await updateEvent(form.dataset.editingId, { title, subtitle, city, date })
        } else {
          await createEvent({ title, subtitle, city, date })
        }

        renderEventsPage()
      } catch (error) {
        showToast(error.message, 'error')
        submitButton.disabled = false
        submitButton.textContent = form.dataset.editingId ? '保存修改' : '创建活动'
      }
    })

    document.getElementById('users-btn')?.addEventListener('click', renderUsersPage)

    document.getElementById('logout-btn').addEventListener('click', () => {
      localStorage.removeItem('token')
      localStorage.removeItem('currentUser')
      renderLoginPage()
    })

    document.getElementById('search-btn').addEventListener('click', () => {
      const city = document.getElementById('search-city').value.trim()
      const date = document.getElementById('search-date').value
      renderEventsPage({ city, date })
    })

    document.getElementById('search-city').addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        document.getElementById('search-btn').click()
      }
    })

    document.getElementById('reset-btn').addEventListener('click', () => renderEventsPage())

    document.querySelectorAll('.edit-btn').forEach(button => {
      button.addEventListener('click', () => {
        const event = events.find(item => item.id === Number(button.dataset.id))

        titleInput.value = event.title
        subtitleInput.value = event.subtitle || ''
        cityInput.value = event.city
        dateInput.value = event.date
        form.dataset.editingId = event.id
        formTitle.textContent = '编辑活动'
        submitButton.textContent = '保存修改'
        cancelButton.classList.remove('is-hidden')
        document.getElementById('create-panel').scrollIntoView({ behavior: 'smooth', block: 'start' })
        titleInput.focus({ preventScroll: true })
      })
    })

    cancelButton.addEventListener('click', () => {
      form.reset()
      delete form.dataset.editingId
      formTitle.textContent = '发布新活动'
      submitButton.textContent = '创建活动'
      cancelButton.classList.add('is-hidden')
    })

    document.querySelectorAll('.delete-btn').forEach(button => {
      button.addEventListener('click', async () => {
        if (!confirm('确定要删除这个活动吗？此操作无法撤销。')) {
          return
        }

        try {
          await deleteEvent(button.dataset.id)
          renderEventsPage()
        } catch (error) {
          showToast(error.message, 'error')
        }
      })
    })

    document.querySelectorAll('.detail-btn').forEach(button => {
      button.addEventListener('click', () => renderEventDetailPage(button.dataset.id))
    })
  } catch (error) {
    app.innerHTML = createErrorState('活动加载失败', error.message)
  }
}
