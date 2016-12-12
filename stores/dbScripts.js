import db from './db'
const fs = require('fs')
const path = require('path')

export const createSchema = () => db.any(
  fs.readFileSync(
    path.join(__dirname, './sql/schema.sql')
  ).toString()
)


export const insertDummyData = () => {
  const schemaString = fs.readFileSync(
    path.join(__dirname, './sql/dummyData.sql')
  ).toString()
  return db.any(schemaString)
    .catch((err) => console.error(err))
}

export const dropSchema = () => {
  const schemaString = fs.readFileSync(
    path.join(__dirname, './sql/dropSchema.sql')
  ).toString()
  return db.any(schemaString)
    .catch((err) => console.error(err))
}

export const dropData = () => {
  const schemaString = fs.readFileSync(
    path.join(__dirname, './sql/dropData.sql')
  ).toString()
  return db.any(schemaString)
    .catch((err) => console.error(err))
}
