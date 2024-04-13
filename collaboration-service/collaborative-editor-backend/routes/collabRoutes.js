const express = require('express')
const router = express.Router()

const { createRoom } = require('../controllers/collabController')

router.route('/').post(createRoom)

module.exports = router