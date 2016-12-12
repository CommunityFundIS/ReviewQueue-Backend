import db from './db'
const fs = require('fs')
const path = require('path')

export const createDatabase = () => {
  const schemaString = fs.readFileSync(
    path.join(__dirname, './sql/schema.sql')
  ).toString()
  return db.any(schemaString)
    .catch((err) => console.error(err))
}

export const insertDummyData = () => {
  const schemaString = fs.readFileSync(
    path.join(__dirname, './sql/insertDummyData.sql')
  ).toString()
  return db.any(schemaString)
    .catch((err) => console.error(err))
}

export const dropDb = () => {
  const schemaString = fs.readFileSync(
    path.join(__dirname, './sql/emptydb.sql')
  ).toString()
  return db.any(schemaString)
    .catch((err) => console.error(err))
}
