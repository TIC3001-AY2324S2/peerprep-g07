// import Question model
const Question = require('../models/questionModel')

// @desc    Fetch all questions
// @route   GET /api/questions
// @access  Public
const fetchAllQuestions = async (req, res) => {
  // function provided by Mongoose to fetch all Question documents
  const questions = await Question.find({})

  // return all questions in JSON format 
  // with success status 200
  res.status(200).json(questions)
}

// @desc    Return a question
// @route   GET /api/question
// @access  Public
const fetchOneQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id)

    res.status(200).json(question)
  } catch (error) {
    res.status(404).json({ message: 'Question not found' })
  }
}

// @desc    Add a question
// @route   POST /api/question
// @access  Public
const addQuestion = async (req, res) => {
    const { title, description, category, complexity} = req.body
  
    // validate request body
    if (!title || !description || !category ||!complexity) {
      return res.status(400).json({ message: 'Please enter all fields.' })
    }
  
    try {
      // check if question already exist 
      const query = await Question.where({title: title}).findOne()
      if ( query != null ) {
        return res.status(400).json({ message: 'Question already exists.' })
      }

      // function provided by Mongoose to create a new Question document
      const question = await Question.create({
        title,
        description,
        category,
        complexity
      })
  
      // return the newly created Question in JSON format
      // with created success status 201
      res.status(201).json({
        _id: question._id,
        title: question.title,
        description: question.description,
        category: question.category,
        complexity: question.complexity
      })
    } catch (error) {
      // catch exception when fields are missing
      res.status(400).json({ message: 'Invalid Question Data' })
    }
  }


// @desc    Update an question
// @route   PUT /api/question/:id
// @access  Public
const updateQuestion = async (req, res) => {
    const { title, description, category, complexity} = req.body
  
    // validate request body
    if (!title || !description || !category ||!complexity) {
        return res.status(400).json({ message: 'Please enter all fields.' })
    }
  
    try {
      // function provided by mongoose to find a
      // Question document with a given ID
      // req.params.id is retrieved from /:id in route
      const question = await Question.findById(req.params.id)
  
      // update the document
      question.title = title
      question.description = description
      question.category = category
      question.complexity = complexity
  
      // function provided by mongoose to
      // save the changes made to a document
      await question.save()
  
      // return the updated question in JSON format
      // with success status 200
      res.status(200).json({
        _id: question._id,
        title: question.title,
        description: question.description,
        category: question.category,
        complexity: question.complexity
      })
    } catch (error) {
      res.status(400).json({ message: 'Invalid Question data.' })
    }
  }

// @desc    Delete a question
// @route   DELETE /api/question
// @access  Public
const deleteQuestion = async (req, res) => {
    try {
      // function provided by mongoose to find an
      // Question document with a given ID
      // req.params.id is retrieved from /:id in route
      const question = await Question.findById(req.params.id)
      
      // function provided by mongoose to delete a document
      await question.deleteOne()
        
      
      res.status(200).json({ message: 'Question removed' })
    } catch (error) {
      res.status(404).json({ message: 'Question not found' })
    }
  }
  
// export controller functions to be used in corresponding route
module.exports = { fetchAllQuestions, fetchOneQuestion, addQuestion, updateQuestion, deleteQuestion }

