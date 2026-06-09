import { API_BASE_URL } from './config.js'

export async function getUsers() {
  const token = localStorage.getItem('token')

  const response = await fetch(`${API_BASE_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Failed to fetch users')
  }

  return data
}

export async function registerUser(user) {
  const response = await fetch(`${API_BASE_URL}/users/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Failed to register user')
  }

  return data
}

export async function loginUser(user) {
  const response = await fetch(`${API_BASE_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Failed to login')
  }

  return data
}

export async function getCurrentUser() {
  const token = localStorage.getItem('token')

  const response = await fetch(`${API_BASE_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Failed to get current user')
  }

  return data
}

