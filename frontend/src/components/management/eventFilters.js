import { escapeHtml } from '@/utils/html.js'

export function createEventFilters(filters = {}) {
  const hasFilters = filters.city || filters.date

  return `
    <div class="toolbar">
      <div class="search-field">
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>
        <input id="search-city" placeholder="搜索城市..." value="${escapeHtml(filters.city || '')}">
      </div>
      <label class="date-filter">
        <span>日期</span>
        <input id="search-date" type="date" value="${escapeHtml(filters.date || '')}">
      </label>
      <button class="button button-dark" id="search-btn" type="button">筛选</button>
      <button class="button button-ghost ${hasFilters ? '' : 'is-subtle'}" id="reset-btn" type="button">重置</button>
    </div>
  `
}
