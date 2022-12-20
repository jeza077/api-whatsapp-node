const express = require('express');
const router = express.Router();
const whatsappController = require('../controllers/whatsappControllers');

router
.get("/", whatsappController.VerifyToken)
.post("/", whatsappController.ReceiveMessage)


module.exports = router;