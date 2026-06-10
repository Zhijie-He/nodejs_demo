import { renderLoginPage } from '@/pages/management/loginPage.js'
import { renderEventsPage } from '@/pages/management/eventsPage.js'
import { renderPortalPage } from '@/pages/public/portalPage.js'
import { getCurrentUser } from '@/api/eventsApi.js'

async function renderManagement() {
  const token = localStorage.getItem('token')

  if (!token) {
    renderLoginPage()
    return
  }

  try {
    const user = await getCurrentUser()
    localStorage.setItem('currentUser', JSON.stringify(user))
    renderEventsPage()
  } catch (error) {
    localStorage.removeItem('token')
    localStorage.removeItem('currentUser')
    renderLoginPage()
  }
}

async function startApp() {
  document.body.classList.remove('portal-body')
  const route = window.location.hash.slice(1) || 'home'

  if (route === 'manage') {
    await renderManagement()
    return
  }

  await renderPortalPage(route)
}

window.addEventListener('hashchange', startApp)
startApp()
