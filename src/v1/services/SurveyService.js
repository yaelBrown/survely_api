const Constants = require('../utils/constants')

class SurveyService {
  _generateSurveyPath() {
    const len = PATH_LENGTH
    let out = ""
    for (let i = 0; i < len; i++) {
      out += ASCII_LETTERS[Math.floor(Math.random() * ASCII_LETTERS.length)]    
    }
    return out
  }

  getSurveyFromPathMapper(data, path) {
    let out = {
      surveyee_id: data[0].surveyee_id,
      surveyee_path: path,
      surveyee_mobile: data[0].surveyee_mobile,
      surveyee_whatsapp: data[0].surveyee_whatsapp,
      surveyee_email: data[0].surveyee_email,
      surveyee_name: data[0].surveyee_name,
      surveyor_user_id: data[0].surveyor_user_id,
      surveyor_group_id: data[0].surveyor_group_id,
      survey_id: data[0].survey_id,
      survey_name: data[0].survey_name,
      survey_date: data[0].survey_date,
      survey_is_active: data[0].survey_is_active,
    }
    
    const tempQ = []
    const tempR = []
    const tempRset = new Set()

    data.forEach((e) => {
      if (e.survey_question_id != null) {
        const temp_q = {
          question_id: e.survey_question_id,
          question: e.question,
          question_order: e.question_order
        }
        
        tempQ.push(temp_q)
      }
  
      if (e.survey_response_id != null) {
        if (!(tempRset.has(e.survey_response_id))) {
          const temp_r = {
            response_id: e.survey_response_id,
            response_question_id: e.question_id,
            response: e.response,
            responded_date: e.responded_date
          }
          
          tempRset.add(e.survey_response_id)
          tempR.push(temp_r)
        }
      }
    })
    
    out.questions = tempQ.reverse()
    out.questions_length = tempQ.length
    out.responses = tempR.reverse()
    out.responses_length = tempR.length

    return out
  }
}

module.exports = { SurveyService }