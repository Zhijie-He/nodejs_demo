const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const db = require('../database/db')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

const router = express.Router()

// get all users
router.get('/', auth, admin, (req, res) => {
  db.all(
    'SELECT id, username, role FROM users ORDER BY id DESC',
    [],
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          error: err.message
        })
      }

      res.json(rows)
    }
  )
})

// create new user
router.post('/register', async (req, res) => {
  const username = req.body.username?.trim()
  const password = req.body.password

  if (!username || !password) {
    return res.status(400).json({
      error: 'username and password are required'
    })
  }

  if (password.length < 3) {
    return res.status(400).json({
      error: 'password must be at least 3 characters'
    })
  }

  const userRole = 'user'

  try {
    const hashedPassword = await bcrypt.hash(password, 10)

    db.run(
      'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
      [username, hashedPassword, userRole],
      function (err) {
        if (err) {
          if (err.message.includes('UNIQUE')) {
            return res.status(400).json({
              error: 'Username already exists'
            })
          }

          return res.status(500).json({
            error: err.message
          })
        }

        res.status(201).json({
          id: this.lastID,
          username,
          role: userRole
        })
      }
    )
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
})

// user login
router.post('/login', (req, res) => {
  const username = req.body.username?.trim()
  const password = req.body.password

  if (!username || !password) {
    return res.status(400).json({
      error: 'username and password are required'
    })
  }

  db.get(
    'SELECT id, username, password, role FROM users WHERE username = ?',
    [username],
    async (err, user) => {
      if (err) {
        return res.status(500).json({
          error: err.message
        })
      }

      if (!user) {
        return res.status(401).json({
          error: 'Invalid username or password'
        })
      }

      const isPasswordValid = await bcrypt.compare(password, user.password)

      if (!isPasswordValid) {
        return res.status(401).json({
          error: 'Invalid username or password'
        })
      }

      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          role: user.role
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '1h'
        }
      )

      res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          role: user.role
        }
      })
    }
  )
})

// get current user
router.get('/me', auth, (req, res) => {
  res.json(req.user)
})

module.exports = router