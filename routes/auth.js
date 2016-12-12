'use strict'

/*
  POST /auth/sms - Request a sms
*/
export const sms = (event, context, callback) => {
  const response = {
    message: 'SMS sent'
  }

  callback(null, response)
}

/*
  POST /auth/validate - Validate confirmation code
*/
export const validate = (event, context, callback) => {
  const response = {
    auth: {
      apiKey: '38d956a9-a584-46a8-89fc-345ca97ad6f5',
    }
    user: {
      name: 'Kristján Ingi',
      phone: '+3546964545',
      email: 'mail@foo.com'
    }
  }

  callback(null, response)
}
