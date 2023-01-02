async function surveyRoutes(fastify) {
  fastify.get('/', async (req, res) => {
    return { msg: "Survey Route ok" }
  })
}

module.exports = surveyRoutes