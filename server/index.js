const path = require('path')
const fastify = require('fastify')()

const ffmpeg = require('./ffmpeg')()

fastify.use(require('cors')())
fastify.register(require('fastify-static'), {
  root: path.join(process.cwd(), 'public'),
})

fastify.get('/', async (request, reply) => {
  reply.sendFile('index.html') // serving path.join(__dirname, 'public', 'myHtml.html') directly
})

fastify.post('/stream', async ({ query, params, headers, body }, reply) => {
  switch (body.action) {
    case 'start': {
      ffmpeg.start(body.key)
    }
    break;
    case 'stop': {
      ffmpeg.stop()
    }
    break;
  }
  reply.type('application/json').code(200)
  return { hello: 'world' }
})

fastify.listen(3000, (err, address) => {
  if (err) throw err
  fastify.log.info(`server listening on ${address}`)
})
