require('dotenv').config()

const PORT = process.env.PORT || 3003
const HOST = process.env.HOST || 'localhost'
const MONGODB_URI = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI
const IG_ACCESS_TOKEN = process.env.IG_ACCESS_TOKEN
const IG_USERID = process.env.IG_USERID

module.exports = {
  MONGODB_URI,
  PORT,
  IG_ACCESS_TOKEN,
  IG_USERID,
  HOST
}