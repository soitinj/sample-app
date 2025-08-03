const mongoose = require('mongoose')

const thumbnailSchema = mongoose.Schema({
  imgData: {
    type: String,
    required: true,
  },
})

thumbnailSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Thumbnail', thumbnailSchema)