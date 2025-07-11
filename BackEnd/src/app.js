const express = require('express');
const aiRoutes = require("./routes/ai.routes")
const cors = require('cors')

const app = express()

if (process.env.NODE_ENV === 'production') {
    app.use(cors({ origin: process.env.FRONTEND_ORIGIN }));
} else {
    app.use(cors());
}

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello from Express!');
})

app.use('/ai', aiRoutes)

module.exports = app
