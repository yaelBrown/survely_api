const { SurveyService } = require("../../services/SurveyService");

const ss = new SurveyService()

const surveyRoutes = async (fastify) => {
  fastify.get("/", (req, res) => {
    return { msg: "Survey Route ok" };
  });

  fastify.get("/:surveyee_id", (req, reply) => {
    const { surveyee_id } = req.params;
    
    fastify.mysql.query(
      'select surveyees.id, surveyees.survey_id, surveyees.surveyee_mobile, surveyees.surveyee_whatsapp, surveyees.surveyee_email, surveyees.surveyee_name, surveys.id, surveys.surveyor_user_id, surveys.surveyor_group_id, surveys.survey_name, surveys.survey_date, surveys.survey_is_active from surveyees left join surveys ON surveyees.survey_id = surveys.id where surveyees.path = ?', 
      [surveyee_id],
      function onResult(err, data) {
        reply.send(err || data)
      }
    )

  });

  fastify.post("/info", (req, res) => {});
}

module.exports = surveyRoutes;

