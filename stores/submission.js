import db from './db'

// TODO: Page this.
export const getSubmissions = () => db.manyOrNone(
  'select * from submission'
)

export const getSubmissionById = id => db.one(
  'select * from community_fund.submission where id=$1',
  [id]
)
