const { SurveyService } = require("../../services/SurveyService");

const ss = new SurveyService()

const surveyRoutes = async (fastify) => {
  fastify.get("/", (req, res) => {
    return { msg: "Survey Route ok" };
  });

  fastify.get("/:surveyee_id", (req, reply) => {
    const { surveyee_id } = req.params;
    
    fastify.mysql.query(
      'SELECT * FROM surveyees WHERE PATH = ?', 
      [surveyee_id],
      function onResult(err, data) {
        reply.send(err || data)
      }
    )

  });

  fastify.post("/info", (req, res) => {});
}

module.exports = surveyRoutes;

