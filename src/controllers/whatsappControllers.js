const VerifyToken = (req, res) => {

    try {
        var accessToken = "ERGFWEIMWE84654AED8WEF658EEW14";
        var token = req.query["hub.verify.token"];
        var challenge = req.query["hub.challenge"];

        if(challenge != null && token != null && token == accessToken) {
            res.send(challenge);
            // res.send('Holaaaaa')
        } else {
            res.status(400).send();
        }
        // res.send("Hola verifyToken");


    } catch (e) {
        res.send(e);
        res.status(400).send();
    }


    // res.send("Hola verifyToken");
}

const ReceiveMessage = (req, res) => {
    res.send("Hola Received");
}

module.exports = {
    VerifyToken,
    ReceiveMessage
}