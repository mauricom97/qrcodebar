const express = require('express')
const port = process.env.PORT || 3000
const app = express()
require('dotenv').config()

require('./routes/index')(app)


app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})