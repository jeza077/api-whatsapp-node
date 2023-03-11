const express = require('express');
const router = express.Router();
const whatsappController = require('../controllers/whatsappControllers');
const BackWaController = require('../controllers/BackWaController');


const app = express();

router
.get("/", whatsappController.VerifyToken)
.post("/", whatsappController.ReceiveMessage)

router.get('/backWa', BackWaController.backWa);
router.post('/backWa', BackWaController.redirectWa);

module.exports = router;