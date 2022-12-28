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
            Authorization: "Bearer " + process.env.TOKEN_WA
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