const db = require("../db/config")

class SurveyRepository {
  getInitialSurvey(path) {}

  async findByPath(path) {
    const sql = `SELECT * FROM surveyees WHERE PATH = '${path}'`

    let out = []
    try {
      await db.execute(sql, (err, rows, fields) => {
        console.log(rows[0])
        out = rows[0]
        return 
      })

      console.log(out)
      return out
    } catch(err) {
      console.error(err)
      return err
    }
  } 
}

module.exports = SurveyRepository

// https://www.npmjs.com/package/mysql2-async
