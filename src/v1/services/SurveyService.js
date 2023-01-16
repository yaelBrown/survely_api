const Constants = require('../utils/constants')
const SurveyRepository = require("../respositories/SurveyRepository")

const sr = new SurveyRepository()

class SurveyService {
  _generateSurveyPath() {
    const len = PATH_LENGTH
    let out = ""
    for (let i = 0; i < len; i++) {
      out += ASCII_LETTERS[Math.floor(Math.random() * ASCII_LETTERS.length)]    
    }
    return out
  }

  async getSurvey(p) {
    p = p.trim()
    const out = await sr.findByPath(p)
    console.log({out})
    return out
  }
}

module.exports = { SurveyService }