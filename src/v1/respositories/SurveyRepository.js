import db from "../db/config";

class SurveyRepository {
  getInitialSurvey(path) {}

  findByPath(path) {
    const sql = `SELECT * FROM WHERE PATH = ${path}`
    try {
      db.query(sql, (err, rows, fields) => {
        console.log(rows)
        return rows
      })
    } catch(err) {
      console.error(err)
      return err
    }
  }


  
}

export default SurveyRepository