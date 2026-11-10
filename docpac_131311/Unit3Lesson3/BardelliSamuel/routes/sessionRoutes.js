const express = require('express')
const sessionRoutes = express.Router()

sessionRoutes.get('/session-test', (req, res) => {
    if (req.session.views) {
        req.session.views++
    }
    else {
        req.session.views = 1
    }
    res.render('sessionTest', {
        title: `You have visited the page: ${req.session.views} times`,
        navs: [
            { 'href': '/', 'text': 'Home' },
            { 'href': '/form', 'text': 'form page' }
        ]
    })
})

sessionRoutes.post('/session-test/reset', (req, res) => {
    if (req.session.views){
        req.session.views = null
    }
    res.redirect('/session-test')
})


module.exports = { sessionRoutes }