import { createPortalContact } from '@/components/public/portalContact.js'

export function createAboutPage() {
  return `
    <main class="portal-main portal-about-main">
      <section class="portal-page-hero portal-page-hero-about">
        <span class="portal-kicker portal-kicker-light">About EU Cottage</span>
        <h1>我们相信，好的连接<br>能够改变创新的方向。</h1>
        <p>EU Cottage 是一个专注中欧创新交流的平台。我们把跨文化理解、产业资源和长期关系放在每一次合作的中心。</p>
      </section>
      <section class="portal-section portal-story">
        <div class="portal-story-number">EU<br>CN</div>
        <div><span class="portal-kicker">Why we exist</span><h2>在两个创新生态之间，建立一座有温度的桥。</h2><p>真正有效的国际合作，不只是一次会议或一份介绍。它需要共同经历、深入理解和持续信任。EU Cottage 因此而生：让欧洲创新者看见真实的中国，也让中国伙伴连接更广阔的欧洲人才与技术网络。</p></div>
      </section>
      <section class="portal-values">
        <article><span>01</span><h3>真实</h3><p>从真实需求和真实场景出发。</p></article>
        <article><span>02</span><h3>长期</h3><p>关注关系与价值的持续成长。</p></article>
        <article><span>03</span><h3>开放</h3><p>尊重差异，让不同观点产生新可能。</p></article>
      </section>
      ${createPortalContact()}
    </main>
  `
}
