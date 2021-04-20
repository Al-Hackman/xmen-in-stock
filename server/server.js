require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const warehouse = require('./routes/warehouse');
// const inventory = require('./routes/inventory');
const port = process.env.PORT

app.use(cors());
app.use(express.json())
app.use((_req,_res, next) => {
    next()
})

app.use('/warehouse',warehouse);
// app.use('/inventory',inventory);

app.get('/', (_req, res) => {
    res.send('Welcome to the server'); 
});


app.listen(port, error => error? console.error(error):console.info(`I am running ${port}`))
