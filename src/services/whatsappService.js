// const res = require('express/lib/response');
const https = require('https');

const SendMessageWhatsapp = (textResponse, number) => {
    
    const data = JSON.stringify(
        {
            "messaging_product": "whatsapp",    
            "recipient_type": "individual",
            "to": number,
            "type": "text",
            "text": {
                "preview_url": false,
                "body": textResponse
            }
        }
    );

    const options = {
        host: "graph.facebook.com",
        path: "/v15.0/101999332771661/messages",
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer EAAubQGSCTC8BAIH6hf3zlfy9tCjPlLOZAC0rzsby3upm450Ek9ZA0iEYNBLwJAOo1NJNNzFNMzTYUXH9UVTOjuTseMkCJATptzUmTUHiLpqv7zjHqr3PrtPVUNIhyjroREI5mVDZA6TcnmV5xp39UPd5Hi9fwfHrrO0BZBMvT9I8wtviF2lA"
        }
    };


    const req = https.request(options, res => {
        res.on("data", d=> {
            process.stdout.write(d);
        });
    });

    req.on("error", error => {
        console.error(error);
    });

    req.write(data);
    req.end();
}



module.exports = {
    SendMessageWhatsapp
}