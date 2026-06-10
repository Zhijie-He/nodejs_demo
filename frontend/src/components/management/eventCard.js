import { escapeHtml, formatEventDate } from '@/utils/html.js'

export function createEventCard(event, currentUser, index = 0) {
  const canManage = currentUser.role === 'admin' || event.user_id === currentUser.id
  const accent = ['blue', 'violet', 'mint', 'orange'][index % 4]

  return `
    <article class="event-card accent-${accent}">
      <div class="event-card-top">
        <span class="event-location">
          <svg viewBox="0 0 24 24"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>
          ${escapeHtml(event.city)}
        </span>
        <span class="event-id">#${event.id}</span>
      </div>
      <div class="event-card-body">
        <h3>${escapeHtml(event.title)}</h3>
        <p class="event-subtitle">${escapeHtml(event.subtitle || '一场值得期待的精彩活动')}</p>
        <p class="event-date">${escapeHtml(formatEventDate(event.date))}</p>
      </div>
      <div class="event-card-footer">
        <div class="creator">
          <span class="mini-avatar">${escapeHtml((event.creator_name || '未知').slice(0, 1).toUpperCase())}</span>
          <span>由 <strong>${escapeHtml(event.creator_name || '未知用户')}</strong> 创建</span>
        </div>
        <div class="card-actions">
          ${canManage
            ? `
              <button class="icon-button edit-btn" data-id="${event.id}" type="button" title="编辑活动" aria-label="编辑活动">
                <svg viewBox="0 0 24 24"><path d="m4 20 4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10L4 20Z"/><path d="m14 7 3 3"/></svg>
              </button>
              <button class="icon-button icon-button-danger delete-btn" data-id="${event.id}" type="button" title="删除活动" aria-label="删除活动">
                <svg viewBox="0 0 24 24"><path d="M4 7h16M9 7V4h6v3m3 0-1 13H7L6 7m4 4v5m4-5v5"/></svg>
              </button>
            `
            : ''
          }
          <button class="button button-small button-soft detail-btn" data-id="${event.id}" type="button">
            查看详情
          </button>
        </div>
      </div>
    </article>
  `
}
