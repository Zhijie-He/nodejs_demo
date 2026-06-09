const express = require('express')

const router = express.Router()

let newsList = [
  {
    id: 1,
    title: 'Platform launched',
    content: 'Our platform is now online.'
  },
  {
    id: 2,
    title: 'New city added',
    content: 'Berlin is now supported.'
  }
]

router.get('/', (req, res) => {
  res.json(newsList)
})

router.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  const news = newsList.find(item => item.id === id)

  if (!news) {
    return res.status(404).json({
      error: 'News not found'
    })
  }

  res.json(news)
})

router.post('/', (req, res) => {
  const { title, content } = req.body

  const newNews = {
    id: newsList.length + 1,
    title,
    content
  }

  newsList.push(newNews)

  res.status(201).json(newNews)
})

module.exports = router