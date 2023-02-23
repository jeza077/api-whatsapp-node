const fs = require('fs');
const { JSON } = require('mysql/lib/protocol/constants/types');
const myConsole = new console.Console(fs.createWriteStream("./logs.text"));
const processMessage = require('../shared/processMessage');


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

            console.log(messageObject)
            console.log(messages)

            if(text != ""){
                processMessage.Process(text, number);
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


// Obtener el mensale del usuario sea un texto exrito, una interaccion por boton o por una lista.
const GetTextUser = (messages) => {
    let text = "";
    let typeMessage = messages["type"];

    if(typeMessage == "text"){
        
        const textUserLower = (messages["text"])["body"].toLowerCase();
        const textFormateado = quitarAcentos(textUserLower);
        
        text = textFormateado;
        // text = (messages["text"]);

    } else if(typeMessage == "interactive"){
        let interactiveObject = messages["interactive"];
        let typeInteractive = interactiveObject["type"];

        if(typeInteractive == "button_reply"){
            const textUserLowerButt = (interactiveObject["button_reply"])["id"].toLowerCase();
            const textFormateadoButt = quitarAcentos(textUserLowerButt);
            // text = (interactiveObject["button_reply"])["id"];
            text = textFormateadoButt;

        } else if(typeInteractive == "list_reply"){
            const textUserLowerList = (interactiveObject["list_reply"])["title"].toLowerCase();
            const textFormateadoList = quitarAcentos(textUserLowerList);
            text = textFormateadoList;

        } else {
            myConsole.log("Sin mensaje");
            console.log("sin mesage");
        }

    } else if(typeMessage == 'location') {

        // text = JSON.stringify((messages["location"]));
        // text = `lat: ${messages.location.latitude}, long: ${messages.location.longitude}`;
        text = [messages.location.latitude, messages.location.longitude];

    } else {
        myConsole.log("Sin mensaje");
        console.log("sin mesage");
    }

    return text;
}


const quitarAcentos = (cadena) => {
	const acentos = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};
	return cadena.split('').map( letra => acentos[letra] || letra).join('').toString();	
}


module.exports = {
    VerifyToken,
    ReceiveMessage
}