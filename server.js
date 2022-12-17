// Dependencies
const express = require('express')
const app = express()
const Store = require('./models/store.js')
require('dotenv').config()
const PORT = process.env.PORT

// Dependenacies
const mongoose = require('mongoose')
const Item = require("./models/store.js")
const methodOverride = require("method-override")
const store = require('./models/store.js')

// Middle-ware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"))


// Database Hook Up
mongoose.connect(process.env.DATABASE_URI)

// DB success/fail and callback
const db = mongoose.connection
db.on("error", (err) => console.log(err.message + " is mongo not running?"))
db.on("connected", () => console.log(`Mongo connected at ${db.host} : ${db.port}`))
db.on('disconnected', () => console.log('Mongo disconnected'))

app.get('/store/seed', (req, res) => {
    Item.create(       
    [
        {
          name: 'Beans',
          description: 'A small pile of beans. Buy more beans for a big pile of beans.',
          img: 'https://imgur.com/LEHS8h3.png',
          price: 5,
          qty: 99
        }, {
          name: 'Bones',
          description: "It's just a bag of bones.",
          img: 'https://imgur.com/dalOqwk.png',
          price: 25,
          qty: 0
        }, {
          name: 'Bins',
          description: 'A stack of colorful bins for your beans and bones.',
          img: 'https://imgur.com/ptWDPO1.png',
          price: 7000,
          qty: 1
        }
      ],
      (error, data) => {
        res.redirect('/store')
      }
    )
    })

// I 
app.get('/store', (req,res) => {
    Store.find({}, (error, allItems) => {
        res.render('index.ejs', { items: allItems})
    })
})

// N 

// D
app.delete('/store/:id', (req,res) =>{
    Store.findByIdAndDelete(req.params.id, (err, data) =>{
        res.redirect('/store')
    })
})

// U 
// C : Create
app.post('/store', (req,res) => {
    Store.create(req.body, (err, item) => {
        res.send(item)
    })
})
// E
// app.get('/store/:id/edit', )

// // S
// app.get('/store/:id', (req,res) => {
//     foundItem.findById(req.params.id, (err, foundItem) => {
//         res.render('show.ejs', {
//             item: foundItem
//         })
//     })
// })

app.listen(PORT, () => console.log(`server is listening on port: ${PORT}`))