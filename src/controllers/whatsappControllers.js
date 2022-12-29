const fs = require('fs');
const myConsole = new console.Console(fs.createWriteStream("./logs.text"));
const whatsappService = require('../services/whatsappService');
const samples = require('../shared/sampleModels');

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

        if(typeof messageObject != "undefined"){
            let messages = messageObject[0];
            let number = messages["from"];
            let text = GetTextUser(messages);
            
            // console.log(text);
            // console.log(number);
            console.log(messageObject);
            // whatsappService.SendMessageWhatsapp(`El usuario dijo : ${text}`, number);

            if(text == 'text'){
                let data = samples.SampleText('Hola usuario, soy un ChatBot', number);
                whatsappService.SendMessageWhatsapp(data);

            } else if(text == 'button'){
                let data = samples.SampleButtons(number);
                whatsappService.SendMessageWhatsapp(data);    
            }
        }
        
        
        // myConsole.log(messageObject);
        res.send("EVENT_RECEIVED");
    } catch (e) {
        // myConsole.log(e);
        console.log(e);
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