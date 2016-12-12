'use strict'

import { db } from './config.json'

import pgp from 'pg-promise'

export default pgp()({
  host: db.host,
  port: db.port,
  database: db.database,
  user: db.user,
  password: db.password,
})
