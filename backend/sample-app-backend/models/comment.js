const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
  comment: {
    type: String,
    required: true,
    minlength: 5,
  },
  posted: Date,
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  likes: {
    type: Number,
  }
})

commentSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Comment', commentSchema)