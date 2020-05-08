var express = require('express')
var router = express.Router()

// Show form with default values
router.get('/', function(req, res){
    res.render('sticker-packs', {
    })
})

router.get('/support/', function(req, res){
    res.render('sticker-packs-support', {
    })
})

router.get('/license/', function(req, res){
    res.render('sticker-packs-license', {
    })
})

router.get('/privacy-policy/', function(req, res){
    res.render('sticker-packs-privacy-policy', {
    })
})

module.exports = router
