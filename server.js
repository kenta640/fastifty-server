'use strict'
require('dotenv').config();
const fastify = require('./app')

fastify.listen(
  process.env.PORT, 
  '0.0.0.0', (err, address) =>{
    if (err) throw err
    fastify.log.info(`server listening on ${address}`)
  }
  ,
);