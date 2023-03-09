const express = require('express');
const apiRoute = require('./routes/routes');


const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static(__dirname + '/public'))

app.use("/whatsapp", apiRoute);

app.listen(PORT, () => {console.log("El puerto es: " + PORT)});