function EventCard({ event, onDelete }) {
  return (
    <div style={{
      border: '1px solid #ddd',
      padding: '12px',
      marginBottom: '12px',
      borderRadius: '8px'
    }}>
      <h3>{event.title}</h3>
      <p>城市：{event.city}</p>
      <p>日期：{event.date}</p>

      <button onClick={() => onDelete(event.id)}>
        删除
      </button>
    </div>
  )
}

export default EventCard