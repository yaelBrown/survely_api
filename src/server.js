require('dotenv').config()

const fastify = require('fastify')({
  logger: true
})

fastify.register(require('@fastify/cors'), (instance) => {
  return (req, callback) => {
    const corsOptions = {
      // This is NOT recommended for production as it enables reflection exploits
      origin: true
    };
    // do not include CORS headers for requests from localhost
    if (/^localhost$/m.test(req.headers.origin)) {
      corsOptions.origin = false
    }
    // callback expects two parameters: error and options
    callback(null, corsOptions)
  }
})

fastify.register(require('@fastify/mysql'), {
  connectionString: `mysql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`
})

const PORT = 3001
const API_VER = 'v1'

// require(`./${API_VER}/db/config`).db;

// test route 
fastify.get('/test', (req, res) => {
  res.send({msg: 'ok'})
})

fastify.register(require(`./${API_VER}/routes/survey/surveyroutes`), {prefix: `${API_VER}/survey`})

fastify.listen({ port: PORT }, (err, addr) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }

  console.log(`Server is now listening on ${addr}`)
})