const express = require('express')
const router = express.Router()

const { fetchAllQuestions, addQuestion, updateQuestion, deleteQuestion, fetchOneQuestion } = require('../controllers/questionController')

// when a GET request is made to http://localhost:8080/api/questions/
router.route('/').get(fetchAllQuestions)
router.route('/:id').get(fetchOneQuestion)
router.route('/').post(addQuestion)
router.route('/:id').put(updateQuestion)
router.route('/:id').delete(deleteQuestion)

module.exports = router