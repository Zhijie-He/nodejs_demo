import { getEvents } from '@/api/eventsApi.js'
import { createPortalContact } from '@/components/public/portalContact.js'
import { portalIcon } from '@/components/public/portalIcon.js'
import { escapeHtml, formatEventDate } from '@/utils/html.js'

export async function createTravelPage() {
  let events = []

  try {
    events = await getEvents()
  } catch {
    events = []
  }

  return `
    <main class="portal-main">
      <section class="portal-page-hero portal-page-hero-travel">
        <span class="portal-kicker portal-kicker-light">Technology travel</span>
        <h1>走进创新发生的地方。</h1>
        <p>不做走马观花的参访。与创始人、工程师、研究者和城市创新者深入交流，建立真正有价值的连接。</p>
      </section>
      <section class="portal-section">
        <div class="portal-section-heading">
          <span class="portal-kicker">Upcoming journeys</span>
          <h2>近期科技旅行与活动</h2>
        </div>
        <div class="portal-public-event-grid">
          ${events.length
            ? events.map(event => `
              <article class="portal-public-event">
                <div class="portal-public-event-art"><span>${escapeHtml(event.city)}</span><strong>${escapeHtml(event.title.slice(0, 1))}</strong></div>
                <div class="portal-public-event-copy">
                  <span class="portal-kicker">${escapeHtml(formatEventDate(event.date))}</span>
                  <h3>${escapeHtml(event.title)}</h3>
                  <p>${escapeHtml(event.subtitle || '进入真实产业现场，发现新的合作与可能。')}</p>
                  <a href="#contact">咨询活动 ${portalIcon('arrow')}</a>
                </div>
              </article>
            `).join('')
            : `
              <div class="portal-empty-events">
                <span>${portalIcon('map')}</span><h3>新的旅程正在筹备</h3><p>联系我们，第一时间获取下一期科技旅行计划。</p>
                <a class="portal-button" href="#contact">获取活动信息 ${portalIcon('arrow')}</a>
              </div>
            `
          }
        </div>
      </section>
      <section class="portal-process">
        <div><span>01</span><strong>产业现场</strong><p>走进企业、实验室与科技园区。</p></div>
        <div><span>02</span><strong>深度对话</strong><p>与决策者和实践者直接交流。</p></div>
        <div><span>03</span><strong>文化体验</strong><p>理解创新背后的城市与文化。</p></div>
        <div><span>04</span><strong>持续连接</strong><p>旅程结束后，合作才刚刚开始。</p></div>
      </section>
      ${createPortalContact()}
    </main>
  `
}
