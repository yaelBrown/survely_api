async function surveyRoutes(fastify: any) {
  fastify.get('/', async (req: any, res: any) => {
    return { msg: "Survey Route ok" }
  })
}

module.exports = surveyRoutes