const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
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
/*
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})*/

module.exports = mongoose.model('Blog', blogSchema)