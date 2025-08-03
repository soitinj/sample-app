const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, config.HOST, () => {
  logger.info(`Server running on port ${config.PORT} / host ${config.HOST}`)
})
