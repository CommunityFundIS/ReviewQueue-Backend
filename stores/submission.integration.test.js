import { getSubmissions, getSubmissionById } from './submission'
import * as dbScripts from './dbScripts'

describe('getSubmissions', () => {
  it('should return an empty array if no submissions exist', async () => {
    const submissions = await getSubmissions()
    expect(submissions).toEqual([])
  })

  it('should get all existing submissions', async () => {
    await dbScripts.dropData()
    await dbScripts.insertDummyData()

    const submissions = await getSubmissions()
    expect(submissions.length).toBeGreaterThan(0)
    expect(submissions[0].id).toEqual(1)
  })
})
