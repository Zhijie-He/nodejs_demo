import {
  registerUser,
  loginUser
} from '../api/usersApi.js'
import { renderEventsPage } from './eventsPage.js'

export function renderLoginPage() {
  const app = document.getElementById('app')

  app.innerHTML = `
    <h1>用户登录</h1>

    <form id="login-form">
      <input id="username" placeholder="用户名">
      <input id="password" type="password" placeholder="密码">

      <button type="submit">登录</button>
      <button id="register-btn" type="button">注册</button>
    </form>
  `

  const form = document.getElementById('login-form')
  const registerButton = document.getElementById('register-btn')

  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const username = document.getElementById('username').value.trim()
    const password = document.getElementById('password').value

    if (!username || !password) {
      alert('请输入用户名和密码')
      return 
    }

    try {
      const data = await loginUser({ username, password })
      localStorage.setItem('token', data.token)
      localStorage.setItem('currentUser', JSON.stringify(data.user))

      alert(`登录成功：${data.user.username}`)
      renderEventsPage()
    } catch (error) {
      alert(error.message)
    }
  })

  registerButton.addEventListener('click', async () => {
    const username = document.getElementById('username').value.trim()
    const password = document.getElementById('password').value

    if (!username || !password) {
      alert('请输入用户名和密码')
      return
    }
    try {
      const user = await registerUser({ username, password })
      alert(`注册成功：${user.username}`)
    } catch (error) {
      alert(error.message)
    }
  })
}