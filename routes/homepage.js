var express = require('express')
var router = express.Router()

// Show form with default values
router.get('/', function(req, res){
    res.render('home', {
    })
})

module.exports = router
