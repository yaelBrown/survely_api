async function surveyRoutes(fastify: { get: (arg0: string, arg1: (req: any, res: any) => Promise<{ msg: string }>) => void }, options: any) {
  fastify.get('/', async (req, res) => {
    return {msg: "Survey Route ok"}
  })
}

module.exports = surveyRoutes