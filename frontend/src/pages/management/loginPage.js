import { registerUser, loginUser } from '@/api/usersApi.js'
import { createBrand } from '@/components/management/layout.js'
import { renderEventsPage } from '@/pages/management/eventsPage.js'

export function renderLoginPage() {
  const app = document.getElementById('app')

  app.innerHTML = `
    <main class="auth-page">
      <section class="auth-showcase">
        <div class="auth-showcase-inner">
          ${createBrand()}
          <div class="showcase-copy">
            <span class="eyebrow eyebrow-light">为每一次相聚而设计</span>
            <h1>发现身边的<br><span>精彩时刻。</span></h1>
            <p>从一个想法开始，组织活动、认识伙伴，让每一次见面都值得期待。</p>
          </div>
          <div class="showcase-card">
            <div class="showcase-date"><strong>18</strong><span>六月</span></div>
            <div>
              <span class="live-pill"><i></i> 热门活动</span>
              <h3>城市日落漫步</h3>
              <p>和有趣的人一起，重新发现熟悉的城市。</p>
            </div>
          </div>
        </div>
      </section>

      <section class="auth-panel">
        <div class="mobile-brand">${createBrand()}</div>
        <form id="login-form" class="auth-form">
          <div class="auth-heading">
            <span class="eyebrow">欢迎回来</span>
            <h2>登录你的账户</h2>
            <p>继续管理和探索精彩活动。</p>
          </div>

          <div class="form-message is-hidden" id="form-message" role="status"></div>

          <label class="field">
            <span>用户名</span>
            <input id="username" placeholder="输入用户名" autocomplete="username">
          </label>
          <label class="field">
            <span>密码</span>
            <input id="password" type="password" placeholder="输入密码" autocomplete="current-password">
          </label>

          <button class="button button-primary button-full button-large" id="login-btn" type="submit">登录</button>
          <div class="auth-divider"><span>还没有账户？</span></div>
          <button class="button button-ghost button-full" id="register-btn" type="button">创建新账户</button>
        </form>
      </section>
    </main>
  `

  const form = document.getElementById('login-form')
  const loginButton = document.getElementById('login-btn')
  const registerButton = document.getElementById('register-btn')
  const message = document.getElementById('form-message')

  function getCredentials() {
    return {
      username: document.getElementById('username').value.trim(),
      password: document.getElementById('password').value
    }
  }

  function showMessage(text, type = 'error') {
    message.textContent = text
    message.className = `form-message form-message-${type}`
  }

  form.addEventListener('submit', async event => {
    event.preventDefault()
    const credentials = getCredentials()

    if (!credentials.username || !credentials.password) {
      showMessage('请输入用户名和密码')
      return
    }

    loginButton.disabled = true
    loginButton.textContent = '正在登录...'

    try {
      const data = await loginUser(credentials)
      localStorage.setItem('token', data.token)
      localStorage.setItem('currentUser', JSON.stringify(data.user))
      renderEventsPage()
    } catch (error) {
      showMessage(error.message)
      loginButton.disabled = false
      loginButton.textContent = '登录'
    }
  })

  registerButton.addEventListener('click', async () => {
    const credentials = getCredentials()

    if (!credentials.username || !credentials.password) {
      showMessage('先填写用户名和密码，再创建账户')
      return
    }

    registerButton.disabled = true
    registerButton.textContent = '正在创建...'

    try {
      await registerUser(credentials)
      showMessage('账户创建成功，现在可以登录了', 'success')
    } catch (error) {
      showMessage(error.message)
    } finally {
      registerButton.disabled = false
      registerButton.textContent = '创建新账户'
    }
  })
}
