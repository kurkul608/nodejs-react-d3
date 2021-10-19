const express = require('express')
const fetch = require('node-fetch');
const app = express()
var cors = require('cors')
const port = 3001


app.use(cors({
    origin: 'http://localhost:3000'
}));


app.get('/getJson', (req, res) => {
    fetch('https://api.saveecobot.com/output.json')
        .then(res => res.text())
        .then(body => res.send({
            data: JSON.parse(body)
        }));
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
