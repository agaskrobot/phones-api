const express = require('express')
const router = express.Router()

router.use('/api/v1/phones', require('./phone.routes'))

module.exports = router