const { SurveyService } = require("../../services/SurveyService");

const ss = new SurveyService()

const surveyRoutes = async (fastify) => {
  fastify.get("/", (req, res) => {
    return { msg: "Survey Route ok" };
  });

  fastify.get("/:surveyee_id", (req, reply) => {
    const { surveyee_id } = req.params;
    
    fastify.mysql.query(
      `
        SELECT 
          surveyees.id AS surveyee_id, 
          surveyees.survey_id, 
          surveyees.surveyee_mobile, 
          surveyees.surveyee_whatsapp, 
          surveyees.surveyee_email, 
          surveyees.surveyee_name, 
          surveys.surveyor_user_id, 
          surveys.surveyor_group_id, 
          surveys.survey_name, 
          surveys.survey_date, 
          surveys.survey_is_active,
          surveys.id AS survey_id,
          survey_questions.id AS survey_question_id,
          survey_questions.question,
          survey_questions.question_order,
          survey_responses.id AS survey_response_id,
          survey_responses.question_id,
          survey_responses.response,
          survey_responses.responded_date
        FROM surveyees 
        LEFT JOIN surveys ON surveyees.survey_id = surveys.id 
        LEFT JOIN survey_questions ON surveyees.survey_id = survey_questions.survey_id
        LEFT JOIN survey_responses ON surveyees.id = survey_responses.surveyee_id
        WHERE surveyees.path = ?
      `, 
      [surveyee_id],
      function onResult(err, data) {
        reply.send(ss.getSurveyFromPathMapper(data, surveyee_id) || err)
      }
    )
    
  });

  fastify.post("/:survey_id", (req, reply) => {
    const { survey_id } = req.params
    const body = req.body
    if (!(body.survey_id), !(body.surveyee_id), !(body.question_id), !(body.response)) {
      reply.send({msg: "invalid json body", body})
    }
    fastify.mysql.query(
      `
        INSERT INTO 
          survey_responses (survey_id, surveyee_id, question_id, response, responded_date) 
        VALUES 
          (?,?,?,?,now())
      `,
      [survey_id, body.surveyee_id, body.question_id, body.response],
      function onResult(err, data) {
        reply.send(err || data)
      }
    )
  })

  fastify.post("/info", (req, res) => {});
}

module.exports = surveyRoutes;

