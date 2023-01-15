// import SurveyService from "../../services/SurveyService"

const { default: SurveyService } = require("../../services/SurveyService")

async function surveyRoutes(fastify) {
  fastify.get('/', async (req, res) => {
    return { msg: "Survey Route ok" }
  })
  fastify.get('/s/:surveyee_id', async (req, res) => {
    const { surveyee_id } = req.params
    
    if (surveyee_id === undefined) {
      return { msg: 'invalid surveyee_id'}
    }

    try {
      const data = await SurveyService.getSurvey(p)
      return {
        msg: "ok",
        data
      }
    } catch(err) {
      return { 
        msg: "Error in request",
        err 
      }
    }

    return { msg: surveyee_id }
  })
  fastify.post('/info', async (req, res) => {
    
  })
}

module.exports = surveyRoutes