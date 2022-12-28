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
            Authorization: "Bearer EAAubQGSCTC8BABG46vamm0L6ID19oQdCRUiRIffxfrVo3j6wHMZChUoDx9v9O3mGGOW8OFlMo58im82oZCU9mFXPrUAjLfyk2ZA1bZAhC9VT4kCGzHDhwXFHZAEGg7lEZA8DobLF63qWMjOZB1OZC5bd2LsibkE1ST0sVw99DIM1OZBeOzXZCUk8QQ"
        }
    };


    const req = https.request(options, res => {
        res.on("data", d=> {
            process.stdout.write(d);
        });
    });

    req.on("error", err => {
        console.log(err);
    });

    req.write(data);
    req.end();
}



module.exports = {
    SendMessageWhatsapp
}