const fastify = require('fastify')({
  logger: true
})

const PORT = 3001
const API_VER = 'v1'

// test route 
fastify.get('/test', (req, res) => {
  res.send({msg: 'ok'})
})

// Register multiple routes
// https://stackoverflow.com/questions/57589620/how-to-assign-routes-within-a-base-route-in-fastify
fastify.register(require(`./${API_VER}/routes/survey/surveyroutes`), {prefix: `${API_VER}/survey`})

fastify.listen({ port: PORT }, (err, addr) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }

  console.log(`Server is now listening on ${addr}`)
})