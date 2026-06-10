import { createPortalContact } from '@/components/public/portalContact.js'

export function createIncubationPage() {
  return `
    <main class="portal-main">
      <section class="portal-page-hero portal-page-hero-incubation">
        <span class="portal-kicker portal-kicker-light">Venture incubation</span>
        <h1>让欧洲创新项目，<br>更懂中国市场。</h1>
        <p>从市场认知、伙伴连接到本地验证，为进入中国的创新团队提供务实而持续的支持。</p>
      </section>
      <section class="portal-section portal-incubation-intro">
        <div class="portal-section-heading"><span class="portal-kicker">How we help</span><h2>从一个想法，到一条清晰的落地路径。</h2></div>
        <div class="portal-incubation-grid">
          <article><span>01</span><h3>市场与战略认知</h3><p>理解行业格局、用户需求、政策环境与进入策略。</p></article>
          <article><span>02</span><h3>产业资源连接</h3><p>对接企业、投资机构、供应链、高校与地方生态。</p></article>
          <article><span>03</span><h3>项目验证与共创</h3><p>通过交流、试点和合作，验证产品与商业模式。</p></article>
        </div>
      </section>
      <section class="portal-quote-section"><span class="portal-kicker portal-kicker-light">Our approach</span><blockquote>“我们不替创业者承诺捷径，<br>但会帮助他们找到真正值得走的路。”</blockquote></section>
      ${createPortalContact()}
    </main>
  `
}
