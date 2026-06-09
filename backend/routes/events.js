const express = require('express')
const db = require('../database/db')
const auth = require('../middleware/auth')

const router = express.Router()

function canManageEvent(user, event) {
  return user.role === 'admin' || event.user_id === user.id
}

function isValidDate(date) {
  return /^\d{4}-\d{2}-\d{2}$/.test(date)
}

// get all events or by params
router.get('/', (req, res) => {
  const { city, date } = req.query

  let sql = `
    SELECT events.*, users.username AS creator_name
    FROM events
    LEFT JOIN users ON events.user_id = users.id
  `
  const params = []
  const conditions = []

  if (city) {
    conditions.push('events.city LIKE ?')
    params.push(`%${city}%`)
  }

  if (date) {
    conditions.push('events.date = ?')
    params.push(date)
  }

  if (conditions.length > 0) {
    sql += ` WHERE ${conditions.join(' AND ')}`
  }

  sql += ' ORDER BY events.id DESC'

  db.all(sql, params, (err, rows) => {
    if (err) {
      return res.status(500).json({
        error: err.message
      })
    }

    res.json(rows)
  })
})

// get an event by id
router.get('/:id', (req, res) => {
  const id = Number(req.params.id)

  db.get(
    'SELECT * FROM events WHERE id = ?',
    [id],
    (err, row) => {
      if (err) {
        return res.status(500).json({
          error: err.message
        })
      }

      if (!row) {
        return res.status(404).json({
          error: 'Event not found'
        })
      }

      res.json(row)
    }
  )
})

// add a new event
router.post('/', auth, (req, res) => {
  const title = req.body.title?.trim()
  const city = req.body.city?.trim()
  const date = req.body.date
  const userId = req.user.id

  if (!title || !city || !date) {
    return res.status(400).json({
      error: 'title, city and date are required'
    })
  }

  if (!isValidDate(date)) {
    return res.status(400).json({
      error: 'date must be YYYY-MM-DD'
    })
  }

  db.run(
    'INSERT INTO events (title, city, date, user_id) VALUES (?, ?, ?, ?)',
    [title, city, date, userId],
    function (err) {
      if (err) {
        return res.status(500).json({
          error: err.message
        })
      }

      res.status(201).json({
        id: this.lastID,
        title,
        city,
        date,
        user_id: userId
      })
    }
  )
})

// update an event by id 
router.put('/:id', auth, (req, res) => {
  const id = Number(req.params.id)
  const title = req.body.title?.trim()
  const city = req.body.city?.trim()
  const date = req.body.date

  if (!title || !city || !date) {
    return res.status(400).json({
      error: 'title, city and date are required'
    })
  }

  if (!isValidDate(date)) {
    return res.status(400).json({
      error: 'date must be YYYY-MM-DD'
    })
  }

  db.get(
    'SELECT * FROM events WHERE id = ?',
    [id],
    (err, event) => {
      if (err) {
        return res.status(500).json({
          error: err.message
        })
      }

      if (!event) {
        return res.status(404).json({
          error: 'Event not found'
        })
      }

      if (!canManageEvent(req.user, event)) {
        return res.status(403).json({
          error: 'No permission'
        })
      }

      db.run(
        'UPDATE events SET title = ?, city = ?, date = ? WHERE id = ?',
        [title, city, date, id],
        function (err) {
          if (err) {
            return res.status(500).json({
              error: err.message
            })
          }

          res.json({
            id,
            title,
            city,
            date,
            user_id: event.user_id
          })
        }
      )
    }
  )
})

// delete an event by id
router.delete('/:id', auth, (req, res) => {
  const id = Number(req.params.id)

  db.get(
    'SELECT * FROM events WHERE id = ?',
    [id],
    (err, event) => {
      if (err) {
        return res.status(500).json({
          error: err.message
        })
      }

      if (!event) {
        return res.status(404).json({
          error: 'Event not found'
        })
      }

      if (!canManageEvent(req.user, event)) {
        return res.status(403).json({
          error: 'No permission'
        })
      }

      db.run(
        'DELETE FROM events WHERE id = ?',
        [id],
        function (err) {
          if (err) {
            return res.status(500).json({
              error: err.message
            })
          }

          res.json({
            success: true
          })
        }
      )
    }
  )
})

module.exports = router