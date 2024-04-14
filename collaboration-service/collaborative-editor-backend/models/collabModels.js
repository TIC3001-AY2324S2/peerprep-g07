const mongoose = require('mongoose')

const collabSchema = mongoose.Schema({
  users: {
    type: Array,
    required: [true, 'Please enter users in this room.'],
  },
  questionID: {
    type: String,
    required: [true, 'Please provide question that users will be attempting.']
  }
})

// export Address model to be used in controller
module.exports = mongoose.model('Collab', collabSchema)