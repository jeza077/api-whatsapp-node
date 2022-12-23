const VerifyToken = (req, res) => {

    try {
        var accessToken = "ERGFWEIMWE84654AED8WEF658EEW14";
        var token = req.query["hub.verify_token"];
        var challenge = req.query["hub.challenge"];


        if(challenge != null && token != null && token == accessToken){
            res.send(challenge);
        } else {
            res.status(400).send();
        }

    } catch(e){
        res.status(400).send();
    }

}

const ReceiveMessage = (req, res) => {
    res.send("Hola Received");
}

module.exports = {
    VerifyToken,
    ReceiveMessage
}