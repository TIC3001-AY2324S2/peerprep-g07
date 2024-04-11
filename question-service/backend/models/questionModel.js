const mongoose = require('mongoose')

const questionSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please enter question title'],
  },
  description: {
    type: String,
    required: [true, 'Please enter question description'],
  },
  category: {
    type: Array,
    required: [true, 'Please enter question category'],
  },
  complexity : {
    type: String,
    required: [true, 'Please enter question complexity'],
  },
})

// export Address model to be used in controller
module.exports = mongoose.model('Question', questionSchema)