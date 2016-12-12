'use strict'

import { db } from './config.json'

import pgPromise from 'pg-promise'

export const pgp = pgPromise()

export default pgp({
  host: db.host,
  port: db.port,
  database: db.database,
  user: db.user,
  password: db.password,
})
