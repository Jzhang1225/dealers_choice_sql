const express = require ('express');
const app = express();
const router = require('./routes')

app.get('/', (req, res) =>{
    res.redirect('/player')
})
app.use('/player', router)

const port = process.env.port || 3000

app.listen(port, () =>{
    console.log (`Listening on port (port)`)
})