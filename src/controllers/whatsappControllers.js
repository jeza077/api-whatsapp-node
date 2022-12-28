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
        let messages = messageObject[0];
        let text = GetTextUser(messages);
        
        
        // myConsole.log(messageObject);
        res.send("EVENT_RECEIVED");
    } catch (e) {
        myConsole.log(e);
        res.send("EVENT_RECEIVED");
    }

    // res.send('holaaaaa receive')

}



const GetTextUser = (messages) => {
    let text = "";
    let typeMessage = messages["type"];

    if(typeMessage == "text"){
        text = (messages["text"])["body"];

    } else if(typeMessage == "interactive"){
        let interactiveObject = messages["interactive"];
        let typeInteractive = interactiveObject["type"];
        console.log(interactiveObject);

        if(typeInteractive == "button_reply"){
            text = (interactiveObject["button_reply"])["title"];

        } else if(typeInteractive == "list_reply"){
            text = (interactiveObject["list_reply"])["title"];

        } else {
            myConsole.log("Sin mensaje");
            console.log("sin mesage");
        }

    } else {
        myConsole.log("Sin mensaje");
        console.log("sin mesage");
    }

    return text;
}




module.exports = {
    VerifyToken,
    ReceiveMessage
}