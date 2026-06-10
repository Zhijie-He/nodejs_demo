export function createEventForm() {
  return `
    <aside class="create-panel panel" id="create-panel">
      <div class="panel-heading">
        <div>
          <span class="eyebrow">快速创建</span>
          <h2 id="form-title">发布新活动</h2>
        </div>
        <span class="step-badge">01</span>
      </div>
      <p class="panel-description">填写几个关键信息，让大家快速了解你的活动。</p>

      <form id="event-form" class="event-form">
        <label class="field">
          <span>活动名称</span>
          <input id="title" placeholder="例如：周末城市徒步" autocomplete="off">
        </label>
        <label class="field">
          <span>活动副标题</span>
          <input id="subtitle" placeholder="例如：用脚步重新发现城市" autocomplete="off">
        </label>
        <label class="field">
          <span>举办城市</span>
          <input id="city" placeholder="例如：上海" autocomplete="off">
        </label>
        <label class="field">
          <span>活动日期</span>
          <input id="date" type="date">
        </label>
        <button class="button button-primary button-full" id="submit-btn" type="submit">
          创建活动
        </button>
        <button class="button button-ghost button-full is-hidden" id="cancel-btn" type="button">
          取消编辑
        </button>
      </form>
    </aside>
  `
}
