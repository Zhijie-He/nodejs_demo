import { createPortalFooter } from '@/components/public/portalFooter.js'
import { bindPortalHeader, createPortalHeader } from '@/components/public/portalHeader.js'
import { createAboutPage } from '@/pages/public/aboutPage.js'
import { createHomePage } from '@/pages/public/homePage.js'
import { createIncubationPage } from '@/pages/public/incubationPage.js'
import { createTravelPage } from '@/pages/public/travelPage.js'

const publicPages = {
  home: createHomePage,
  travel: createTravelPage,
  incubation: createIncubationPage,
  about: createAboutPage
}

export async function renderPortalPage(route = 'home') {
  const page = publicPages[route] ? route : 'home'
  const createPage = publicPages[page]
  const content = await createPage()
  const app = document.getElementById('app')

  app.innerHTML = `
    <div class="portal-site">
      ${createPortalHeader(page)}
      ${content}
      ${createPortalFooter()}
    </div>
  `

  document.body.classList.add('portal-body')
  bindPortalHeader()

  if (route === 'contact') {
    window.setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView()
    }, 100)
  } else {
    window.scrollTo({ top: 0 })
  }
}
