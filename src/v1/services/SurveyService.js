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

  async getSurvey(p) {
    return "cookies"
  }
}

module.exports = { SurveyService }