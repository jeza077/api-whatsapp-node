const express = require('express');
// const apiRoute = require('./routes/routes');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const backWaRoutes = require('./routes/routes');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('views', __dirname + '/views');
app.engine('.hbs', engine({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');

app.use('/', backWaRoutes);
app.use("/whatsapp", backWaRoutes);

app.listen(PORT, () => {console.log("El puerto es: " + PORT)});

app.get('/', (req, res) => {
    res.render('home')
  })