// get all events api
export async function getEvents() {
  const response = await fetch('/api/events')

  if (!response.ok) {
    throw new Error('Failed to fetch events')
  }

  return response.json()
}

// create an new event
export async function createEvent(event) {
  const response = await fetch('/api/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(event)
  })

  if (!response.ok) {
    throw new Error('Failed to create event')
  }

  return response.json()
}

// delete an event by id
export async function deleteEvent(id) {
  const response = await fetch(`/api/events/${id}`, {
    method: 'DELETE'
  })

  if (!response.ok) {
    throw new Error('Failed to delete event')
  }

  return response.json()
}

// update an event by id
export async function updateEvent(id, event) {
  const response = await fetch(`/api/events/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(event)
  })

  if (!response.ok) {
    throw new Error('Failed to update event')
  }

  return response.json()
}