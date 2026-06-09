import { useEffect, useState } from 'react'
import {
  getEvents,
  createEvent,
  deleteEvent
} from '../api/eventsApi'
import EventCard from '../components/EventCard'

function EventsPage() {
  const [events, setEvents] = useState([])
  const [title, setTitle] = useState('')
  const [city, setCity] = useState('')
  const [date, setDate] = useState('')
  const [error, setError] = useState('')

  async function loadEvents() {
    try {
      const data = await getEvents()
      setEvents(data)
    } catch (err) {
      setError(err.message)
    }
  }

  useEffect(() => {
    loadEvents()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()

    await createEvent({
      title,
      city,
      date
    })

    setTitle('')
    setCity('')
    setDate('')

    loadEvents()
  }

  async function handleDelete(id) {
    await deleteEvent(id)
    loadEvents()
  }

  return (
    <div>
      <h1>活动列表</h1>

      {error && (
        <p style={{ color: 'red' }}>{error}</p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          placeholder="活动名称"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <input
          placeholder="城市"
          value={city}
          onChange={e => setCity(e.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />

        <button type="submit">
          创建活动
        </button>
      </form>

      <hr />

      {events.map(event => (
        <EventCard
          key={event.id}
          event={event}
          onDelete={handleDelete}
        />
      ))}
    </div>
  )
}

export default EventsPage