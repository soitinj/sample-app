const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  url: String,
  text: String,
  author: String,
  likes: Number,
  added: Date,
  linkType: {
    type: String, // 'img', 'link', 'text'
    enum: ['img', 'link', 'text'],
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  thumbnail: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Thumbnail'
  }
})

/*const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: {
    type: String,
    minlength: 8,
    validate: {
      validator: (v) => {
        const numberArray = v.split('-')
        return numberArray.length === 2 && numberArray.every(piece => piece.length > 1 && Number.isInteger(Number(piece)) )
      },
      message: 'Number must formatted as 09-123456'
    },
    required: true
  }
})*/

blogSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)