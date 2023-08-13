const jsonServer = require('json-server')
const db = require('./db.json')
const server = jsonServer.create()
const router = jsonServer.router(db)
const middlewares = jsonServer.defaults()


server.use(middlewares)

server.post('/posts/:id/reactions/:type', (req, res) => {
  const { id, type } = req.params
  const post = router.db
      .get('posts')
      .find({ id })
      .value()

  post.reactions[type] += 1
  res.jsonp({
      success: true
  })
})

server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})
    // "start": "react-scripts start",