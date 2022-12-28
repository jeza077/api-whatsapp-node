const res = require('express/lib/response');
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
            Authorization: "Bearer EAAubQGSCTC8BANIIC4yGTaK3xMdSZAxxJtjbgQ2pod2FyZCxJIyd8j7YybgYuLWd1xQdBiVsypwMdVE6uULjSBqb3WzpO6sHg8EYRoYez3ANaU2LtEVp7ZAZA49prNZBOIavOmymoweSYAQbMoLJDjU8pt7eKNvTO1OgBGxGdMqWY7FsZC4x0c"
        }
    }


    const req = https.request(options, res => {
        res.on("data", d=> {
            process.stdout.write(d);
        });
    });

    req.on("error", err => {
        console.log(err);
    })

    req.write(data);
    req.end();
}



module.exports = {
    SendMessageWhatsapp
}