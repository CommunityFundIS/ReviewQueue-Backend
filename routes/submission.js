'use strict'

import moment from 'moment'
import db from '../stores/db'

/*
  GET /submission - Get all submissions
*/
export const list = (event, context, callback) => {
  const response = [{
    id: 'foobar1',
    eventTitle: 'UX hittingur í Hörpu',
    votes: {
      voted: 2,
      total: 5
    },
    hasVoted: false,
    status: 'pending'
  },{
    id: 'foobar2',
    eventTitle: 'Beer.js í desember',
    votes: {
      voted: 5,
      total: 5
    },
    hasVoted: true,
    status: 'accepted'
  },{
    id: 'foobar3',
    eventTitle: 'Blómafræðingar hittast',
    votes: {
      voted: 5,
      total: 5
    },
    hasVoted: true,
    status: 'rejected'
  }]

  callback(null, response)
}

/*
  POST /submission - Create a new submission
*/
export const create = (event, context, callback) => {
  callback(null, {
    message: 'Submission created'
  })
}

/*
  GET /submission/{uuid} - Get one submission
*/
export const one = (event, context, callback) => {
  const id = event.path.id

  //testing out postgres
  return db.query('SELECT $1::text as name',['brianc']).then(function(results){
    var response = {
      createdAt: moment().unix(),
      contact: {
        name: 'Foo Barson',
        email: 'foobar@gmail.com',
        phone: '+3546964545'
      },
      event: {
        title: 'UX hittingur í Hörpu',
        date: moment().unix(),
        description: 'Þetta er lýsing á draslinu og verður eflaust mjög löng og næs. Hvað kemur hingað veit enginn en það verður samt mjög gaman að sjá'
      },
      funding: {
        ask: 50000,
        totalCost: 100000
      }
    }

    callback(null, response)

  }).catch(function(error){
    console.error('error',error)
    callback(error)
  })
}

/*
  GET /submission/{uuid}/vote - Vote on submission
*/
export const vote = (event, context, callback) => {
  callback(null, {
    message: 'Voted'
  })
}
