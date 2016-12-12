import * as dbScripts from '../dbScripts'
import { getSubmissions } from './submissions'
import { pgp } from '../db'

beforeEach(async () => {
  await dbScripts.dropDb()
  await dbScripts.createDatabase()
  await dbScripts.insertDummyData()
})

afterEach(async () => pgp.end())

describe('getSubmissions', () => {
  it('should get all the submissions', async () => {
    const submissions = await getSubmissions()
    expect(submissions.length).toBeGreaterThan(0)
    expect(submissions[0].id).toEqual(1)
  })
})
