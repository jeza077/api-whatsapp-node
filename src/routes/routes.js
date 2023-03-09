const express = require('express');
const router = express.Router();
const whatsappController = require('../controllers/whatsappControllers');

const app = express();

router
.get("/", whatsappController.VerifyToken)
.post("/", whatsappController.ReceiveMessage)

app.use(express.static(__dirname + '/public'))
console.log(app.use(express.static(__dirname + '/public')))

module.exports = router;