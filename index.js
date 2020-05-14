var express = require('express')
var config = require('./config.json') // See config.template.json for sample config file
var app = express()
var path = require('path')
app.set('port', config.port || 3000)
app.set('env', config.env || 'development')
// Allow self-signed certs in development
if (app.get('env') == 'development') {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
}
var server = app.listen(app.get('port'), function () {
    console.log('Listening on port %s.', server.address().port)
    console.log('Website live in ' + config.env +' environment at http://localhost:' + app.get('port') + '/')
    console.log('Press Ctrl-C to terminate.')
})

// ===============================================
// Set up Handlebars view engine
// ===============================================
var express_handlebars = require('express-handlebars').create({ defaultLayout:'main' }) // npm i -S express-handlebars
// Use the handlebars as the view engine
app.engine('handlebars', express_handlebars.engine)
app.set('view engine', 'handlebars')

// ===============================================
// Define static public directory
// ===============================================
app.use(express.static(__dirname + '/public'))

// ===============================================
// Paths to npm packages
// ===============================================
app.use('/bootstrap4', express.static(__dirname + '/node_modules/bootstrap/dist')) // redirect Bootstrap4 CSS and JavaScript

app.use('/jquery3.5.1', express.static(__dirname + '/node_modules/jquery/dist')) // redirect jQuery JavaScript

app.use('/datatables', express.static(__dirname + '/node_modules/datatables.net/js')) // redirect DataTables JavaScript

app.use('/datatables_bootstrap4', express.static(__dirname + '/node_modules/datatables.net-bs4')) // redirect DataTables-Bootstrap4 CSS and JavaScript

// ===============================================
// Set copyright to current year
// ===============================================
app.locals.copyrightYear = new Date().getFullYear()
app.locals.copyrightHolder = config.copyrightHolder

// ===============================================
// Use favicon
// ===============================================
//npm install --save serve-favicon
var favicon = require('serve-favicon')
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

// ===============================================
// Define routes
// ===============================================
// Home
app.get('/', function(req, res){
    res.redirect(303, '/home')
})
var homepage = require('./routes/homepage')
app.use('/home', homepage)
var sticker_packs = require('./routes/sticker-packs')
app.use('/sticker-packs', sticker_packs)
// ------------------------
// Special routes if page not found or an error occurred
// ------------------------
// Error page
app.get('/error', function(req, res){
    var err = req.query.err
    res.render('error', {
        err: err
    })
})
// Custom 404 page
app.use(function(req, res){
    res.status(404)
    res.render('404')
})
// Custom 500 page
app.use(function(err, req, res){
    console.error(err.stack)
    res.status(500)
    res.render('500')
})
