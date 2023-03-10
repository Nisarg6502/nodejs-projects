const express = require('express')
const router = express.Router()

const { getAllTasks } = require('../controller/tasks.js')

router.route('/').get(getAllTasks)

module.exports = router