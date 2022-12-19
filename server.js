// Dependencies
const express = require('express')
const app = express()
const Store = require('./models/store.js')
require('dotenv').config()
const PORT = process.env.PORT
// const storeSeed = require('./models/storeSeed.js')

// Dependenacies
const mongoose = require('mongoose')
const methodOverride = require("method-override")

// Middle-ware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"))
app.use(express.static('public'))

// Database Hook Up
mongoose.connect(process.env.DATABASE_URI)

// DB success/fail and callback
const db = mongoose.connection
db.on("error", (err) => console.log('MongoDB as encountered an error: ' + err.message))
db.on("connected", () => console.log(`Mongo connected at ${db.host} : ${db.port}`))
db.on('disconnected', () => console.log('Mongo disconnected'))

// SEED
app.get('/store/seed', (req,res) => {
    Store.create(storeSeed, (error, item) => {
        res.redirect('/store')
    }) 
})

// INDEX
app.get('/store', (req,res) => {
    Store.find({}, (error, items) => {
        res.render('index.ejs', {items})
        // console.log(items);
    })
})

// NEW
app.get('/store/new', (req,res) => {
    res.render('new.ejs')
})

// DELETE
app.delete('/store/:id', (req,res) =>{
    Store.findByIdAndDelete(req.params.id, (err, data) => {
        res.redirect('/store')
    })
})

// UPDATE
app.put('/store/:id', (req,res) => {
    Store.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updateStore) => {
        res.redirect(`/store/${req.params.id}`)
    })
})

// CREATE
app.post('/store', (req,res) => {
    Store.create(req.body, (err, item) => {
        res.redirect('/store')
    })
})
// EDIT
app.get('/store/:id/edit', (req,res) => {
    Store.findById(req.params.id, (err, item) => {
        res.render('edit.ejs', {item})
    })
})

// SHOW
app.get('/store/:id', (req,res) => {
    Store.findById(req.params.id, (err, item) => {
        res.render('show.ejs', {item})
    })
})

app.listen(PORT, () => console.log(`server is listening on port: ${PORT}`))