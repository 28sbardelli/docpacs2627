const express = require('express')
const formRoutes = express.Router()
const { createEntry, getAllEntries, selectQuery, closedb } = require('./../models/entryModel')

formRoutes.get('/form', (req, res) => {
    res.render('form', {
        title: 'Whats your age?',
        navs: [
            { 'href': '/', 'text': 'Home' },
            { 'href': '/form', 'text': 'form page' }
        ]
    })
})

//Accepting input from examining form request body data
formRoutes.post('/form', (req, res) => {
    if (req.body.name && typeof req.body.name == 'string' && req.body.name.trim()) {

        createEntry(req.body.name, 'formpage')

        let entries = getAllEntries()
        let newEntries = []
        for (const entry in entries){
            newEntries.push(`Name: ${entries[entry]['value']}, Source: ${entries[entry]['source']}`     )
        }

        res.render('formResponse', {
            title: `Previous names include:`,
            items: newEntries, 
            navs: [
                { 'href': '/', 'text': 'Home' },
                { 'href': '/form', 'text': 'form page' }
            ]
        })
        closedb()
    }
    else {
        res.status(400).render('error', {
            title: 'Error',
            message: 'Please enter a valid string input',
            code: res.statusCode,
            href: '/form',
            navs: [
                { 'href': '/', 'text': 'Home' },
                { 'href': '/form', 'text': 'form page' }
            ]
        })
    }
})
module.exports = { formRoutes }