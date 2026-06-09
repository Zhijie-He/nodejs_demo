export function createEventCard(event, currentUser) {
  const canManage = currentUser.role === 'admin' || event.user_id === currentUser.id

  return `
    <div style="border:1px solid #ddd; padding:12px; margin:12px;">
      <h3>${event.title}</h3>
      <p>城市：${event.city}</p>
      <p>日期：${event.date}</p>
      <p>创建者：${event.creator_name || '未知用户'}</p>

      ${canManage
        ? `
          <button class="edit-btn" data-id="${event.id}">编辑</button>
          <button class="delete-btn" data-id="${event.id}">删除</button>
        `
        : ''
      }

      <button class="detail-btn" data-id="${event.id}">
        查看详情
      </button>
    </div>
  `
}