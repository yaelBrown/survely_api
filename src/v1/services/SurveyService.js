import { ASCII_LETTERS } from "../utils/constants";

class SurveyService {
  
  
  _generateSurveyPath() {
    const len = 8
    let out = ""
    for (let i = 0; i < len; i++) {
      out += ASCII_LETTERS[Math.floor(Math.random() * ASCII_LETTERS.length)]    
    }
    return out
  }


}

export default SurveyService