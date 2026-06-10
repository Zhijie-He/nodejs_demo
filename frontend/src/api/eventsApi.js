import { API_BASE_URL } from '@/api/config.js'

export async function getEvents(filters = {}) {
  const url = new URL(`${API_BASE_URL}/events`, window.location.origin)

  if (filters.city) {
    url.searchParams.set('city', filters.city)
  }

  if (filters.date) {
    url.searchParams.set('date', filters.date)
  }

  const response = await fetch(url)
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Failed to fetch events')
  }

  return data
}

export async function createEvent(event) {
  const token = localStorage.getItem('token')

  const response = await fetch(`${API_BASE_URL}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(event)
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Failed to create event')
  }

  return data
}

export async function deleteEvent(id) {
  const token = localStorage.getItem('token')

  const response = await fetch(`${API_BASE_URL}/events/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Failed to delete event')
  }

  return data
}

export async function updateEvent(id, event) {
  const token = localStorage.getItem('token')

  const response = await fetch(`${API_BASE_URL}/events/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(event)
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Failed to update event')
  }

  return data
}

export async function getEventById(id) {
  const response = await fetch(`${API_BASE_URL}/events/${id}`)
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Failed to fetch event')
  }

  return data
}
