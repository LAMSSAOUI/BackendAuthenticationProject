const express = require('express')
const router = express.Router()


router.get('/', (req ,res ) => {
    res.json({mssg : 'get my Hero'})
})


module.exports = router