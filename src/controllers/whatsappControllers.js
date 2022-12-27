const fs = require('fs');
const myConsole = new console.Console(fs.createWriteStream("./logs.text"));

const VerifyToken = (req, res) => {

    try {
        var accessToken = "jeza077.";
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

    // res.send('holaaaaa')

}

const ReceiveMessage = (req, res) => {
    try {
        let entry = (req.body["entry"])[0];
        let changes = (entry["changes"])[0];
        let value = changes["value"];
        let messageObject = value["messages"];

        myConsole.log(messageObject);
        res.send("EVENT_RECEIVED");
    } catch (e) {
        myConsole.log(e);
        res.send("EVENT_RECEIVED");
    }

    // res.send('holaaaaa receive')

}

module.exports = {
    VerifyToken,
    ReceiveMessage
}