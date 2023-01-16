const { SurveyService } = require("../../services/SurveyService");

const ss = new SurveyService()

const surveyRoutes = async (fastify) => {
  fastify.get("/", async (req, res) => {
    return { msg: "Survey Route ok" };
  });
  fastify.get("/:surveyee_id", async (req, res) => {
    const { surveyee_id } = req.params;
    
    if (surveyee_id === undefined) {
      return { msg: "invalid surveyee_id" };
    }

    try {
      return {
        msg: "ok",
        daasdfta: await ss.getSurvey(surveyee_id),
      };
    } catch (err) {
      console.log(err)
      return {
        msg: "Error in request",
        err,
      };
    }

    return { msg: surveyee_id };
  });
  fastify.post("/info", async (req, res) => {});

}

module.exports = surveyRoutes;

