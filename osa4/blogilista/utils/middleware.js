const jwt = require('jsonwebtoken')
const morgan = require('morgan')
const logger = require('./logger')
const User = require('../models/user')

morgan.token('payload', (req, _res) => ( JSON.stringify(req.body) ))

const morganLogger = morgan(':method :url :status :res[content-length] - :response-time ms :payload')

const requestLogger = (request, _response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:', request.path)
  logger.info('Body:', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (_request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const tokenExtractor = (request, _response, next) => {
  const authorization = request.header('authorization')
  request.token = authorization && authorization.startsWith('Bearer ') ?
    jwt.verify(authorization.replace('Bearer ', ''), process.env.SECRET) :
    null
  next()
}

const userExtractor = async (request, response, next) => {
  if (request.method !== 'GET') {
    if (!(request.token)) {
      return response.status(401).json({ error: 'Invalid token' })
    }
    const user = await User.findById(request.token.id)
    if (!user) return response.status(400).json({ error: 'User for token does not exist' })
    request.user = user
  }
  next()
}

const errorHandler = (error, _request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(409).json({ error: 'expected `username` to be unique' })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' })
  } else if (error.name ===  'JsonWebTokenError') {
    return response.status(400).json({ error: 'token missing or invalid' })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  morganLogger,
  tokenExtractor,
  userExtractor,
}