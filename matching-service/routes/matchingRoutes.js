const express = require('express')
const router = express.Router()

const { matchUsers } = require('../controllers/matchingController')

// when a GET request is made to http://localhost:3002/api/match
router.route('/').post(matchUsers)

module.exports = router