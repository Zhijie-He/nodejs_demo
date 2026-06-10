import { portalIcon } from '@/components/public/portalIcon.js'

export function createPortalContact() {
  return `
    <section class="portal-contact" id="contact">
      <div>
        <span class="portal-kicker portal-kicker-light">Start a conversation</span>
        <h2>一起创造下一段<br>跨大陆的创新故事。</h2>
      </div>
      <div class="portal-contact-card">
        <p>无论你来自高校、企业、创业团队或投资机构，我们都期待与你建立长期合作。</p>
        <a class="portal-button portal-button-light" href="mailto:hello@eucottage.com">联系我们 ${portalIcon('arrow')}</a>
      </div>
    </section>
  `
}
