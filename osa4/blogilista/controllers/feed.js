const config = require('../utils/config')
const feedRouter = require('express').Router()
const axios = require('axios')

const userId = config.IG_USERID
const accessToken = config.IG_ACCESS_TOKEN

feedRouter.get('/', async(_req, res) => {
  /*const response = await axios.get(
    `https://graph.instagram.com/${userId}/media`,
    { params:
      {
        fields: 'id,caption,media_type,media_url,thumbnail_url,timestamp,permalink',
        accessToken: accessToken,
        limit: 3,
      }
    }
  )
  res.status(201).json(response.data)*/
  res.status(201).json({ postIds: ['C-FrFKbNjTX', 'C_IKpOxNY08'] })
})

module.exports = feedRouter