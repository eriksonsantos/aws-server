const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const register = require('./routes/register')
const login = require('./routes/login')
const {database} = require('./controllers/register')

require('dotenv').config()

const app = express()

app.use(express.json())
//app.use(express.urlencoded({extended:false}))


app.use(morgan('dev'))

app.use(cors({ origin: process.env.CLIENT_URL }))

database.createDatabase()
.then(() => {
        database.createTable()
})

app.use('/', login,register)

app.get('/hello', (req, res) => {
    res.json({
        data: 'Hello Word'
    })
})

app.listen(process.env.PORT, () => {
    console.log('API is running')
})
