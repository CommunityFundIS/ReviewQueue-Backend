import * as dbScripts from './dbScripts'
import { pgp } from './db'

beforeEach(async () => {
  await dbScripts.dropSchema()
  await dbScripts.createSchema()
})

afterEach(async () => pgp.end())

describe('Postgres integration tests', () => {
  require('./submission.integration.test')
})
