async function surveyRoutes(fastify) {
  fastify.get('/', async (req, res) => {
    return { msg: "Survey Route ok" }
  })
  fastify.post('/info', async (req, res) => {
    
  })
}

module.exports = surveyRoutes