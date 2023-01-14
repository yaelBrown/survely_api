// import SurveyService from "../../services/SurveyService"

async function surveyRoutes(fastify) {
  fastify.get('/', async (req, res) => {
    return { msg: "Survey Route ok" }
  })
  fastify.get('/s/:surveyee_id', async (req, res) => {
    const { surveyee_id } = req.params
    return { msg: surveyee_id }
  })
  fastify.post('/info', async (req, res) => {
    
  })
}

module.exports = surveyRoutes