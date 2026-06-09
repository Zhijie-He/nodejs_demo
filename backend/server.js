require('dotenv').config()

const express = require('express')
const cors = require('cors')
const path = require('path')

const eventRoutes = require('./routes/events')
const userRoutes = require('./routes/users')
const newsRoutes = require('./routes/news')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok'
  })
})

app.use('/api/events', eventRoutes)
app.use('/api/users', userRoutes)
app.use('/api/news', newsRoutes)

// 返回 frontend 目录中的 HTML、JS 等静态文件
app.use(express.static(path.join(__dirname, '../frontend')))

app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server running at http://127.0.0.1:${PORT}`)
})