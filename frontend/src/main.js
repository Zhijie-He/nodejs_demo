import { renderLoginPage } from './pages/loginPage.js'
import { renderEventsPage } from './pages/eventsPage.js'
import { getCurrentUser } from './api/usersApi.js'

async function startApp() {
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

startApp()