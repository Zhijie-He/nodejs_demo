import { createPortalContact } from '@/components/public/portalContact.js'
import { portalIcon } from '@/components/public/portalIcon.js'

export function createHomePage() {
  return `
    <main class="portal-main portal-home-main">
      <section class="portal-hero">
        <video class="portal-hero-video" autoplay muted loop playsinline>
          <source src="https://blzcyeyievypdzfbvbik.supabase.co/storage/v1/object/public/hero%20video/Video.MP4" type="video/mp4">
        </video>
        <div class="portal-hero-mask"></div>
        <div class="portal-hero-grid"></div>
        <div class="portal-hero-glow"></div>
        <div class="portal-hero-copy">
          <span class="portal-kicker portal-kicker-light"><i></i> Connecting Europe and China</span>
          <h1>让创新跨越边界，<br><span>让合作真正发生。</span></h1>
          <p>连接欧洲创新者与中国科技生态，在真实的产业现场、创业项目与高校网络中，建立长期而有价值的合作。</p>
          <div class="portal-hero-actions">
            <a class="portal-button portal-button-light" href="#travel">探索科技旅行 ${portalIcon('arrow')}</a>
            <a class="portal-button portal-button-outline" href="#about">了解 EU Cottage</a>
          </div>
        </div>
        <aside class="portal-hero-feature">
          <span class="portal-feature-label"><i></i> Featured journey</span>
          <div class="portal-feature-place">
            <small>China innovation trip</small>
            <strong>走进创新<br>发生的地方</strong>
          </div>
          <div class="portal-feature-meta">
            <span><small>Focus</small><strong>AI · Robotics</strong></span>
            <span><small>Network</small><strong>20+ Partners</strong></span>
          </div>
        </aside>
        <div class="portal-hero-proof">
          <span>一个持续生长的中欧创新网络</span>
          <div><strong>2</strong><small>核心区域</small></div>
          <div><strong>20+</strong><small>创新伙伴</small></div>
          <div><strong>100+</strong><small>社群成员</small></div>
        </div>
      </section>

      <section class="portal-section portal-intro">
        <div class="portal-section-heading">
          <span class="portal-kicker">What we build</span>
          <h2>四维联动的<br>中欧创新网络。</h2>
        </div>
        <p class="portal-section-lead">从科技旅行到创业孵化，从高校交流到企业合作，我们把人才、产业与机会组织在一起，为中欧创新建立长期入口。</p>
      </section>

      <section class="portal-business-grid">
        <a class="portal-business-card portal-business-featured" href="#travel">
          <span class="portal-card-number">01 · China Trip</span>
          <div class="portal-card-icon">${portalIcon('compass')}</div>
          <div><span class="portal-kicker portal-kicker-light">Tech Travel</span><h3>科技旅行</h3><p>深入中国创新腹地，与企业、创业者、高校和城市生态面对面。</p></div>
          <span class="portal-card-link">探索活动 ${portalIcon('arrow')}</span>
        </a>
        <a class="portal-business-card" href="#incubation">
          <span class="portal-card-number">02 · Incubation</span>
          <div class="portal-card-icon">${portalIcon('rocket')}</div>
          <div><span class="portal-kicker">Incubation</span><h3>创业孵化</h3><p>帮助欧洲创新项目理解中国市场，并连接落地所需的产业资源。</p></div>
          <span class="portal-card-link">了解计划 ${portalIcon('arrow')}</span>
        </a>
        <a class="portal-business-card" href="#about">
          <span class="portal-card-number">03 · Community</span>
          <div class="portal-card-icon">${portalIcon('handshake')}</div>
          <div><span class="portal-kicker">Partnership</span><h3>企业与高校合作</h3><p>围绕人才、创新项目与国际交流，构建长期合作关系。</p></div>
          <span class="portal-card-link">认识我们 ${portalIcon('arrow')}</span>
        </a>
      </section>

      <section class="portal-dark-section">
        <div class="portal-dark-heading">
          <span class="portal-kicker portal-kicker-light">Our ecosystem</span>
          <h2>平台生态</h2>
          <p>连接创新创业参访、高校交流、人才社群与企业合作。</p>
        </div>
        <div class="portal-ecosystem-grid">
          <article><span>${portalIcon('spark')}</span><strong>创新创业参访</strong><p>进入科技园区、实验室和创业现场。</p></article>
          <article><span>${portalIcon('building')}</span><strong>高校交流合作</strong><p>连接学生、研究者与国际教育资源。</p></article>
          <article><span>${portalIcon('people')}</span><strong>人才社群网络</strong><p>汇聚 AI、机器人和数字技术人才。</p></article>
          <article><span>${portalIcon('globe')}</span><strong>中欧企业合作</strong><p>让技术、市场与产业需求高效对接。</p></article>
        </div>
      </section>

      <section class="portal-partners">
        <span class="portal-kicker">Trusted network</span>
        <h2>与创新生态中的伙伴并肩前行</h2>
        <div class="portal-partner-row">
          <span>Huawei</span><span>ByteDance</span><span>JAKA Robotics</span><span>28digital</span><span>EIT Alumni</span><span>EIT CSSA</span>
        </div>
      </section>
      ${createPortalContact()}
    </main>
  `
}
