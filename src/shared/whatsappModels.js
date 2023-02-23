const MessageText = (textResponse, number) => {
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

    return data;
}


const MessageTextName = (textResponse, number) => {
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

    // const name = true;
    // return [data, name];
    return data;
}


const ButtonMessage = (textResponse, buttonOptions, number) => {
    const data = JSON.stringify(
        {
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": number,
            "type": "interactive",
            "interactive": {
                "type": "button",
                "body": {
                    "text": textResponse
                },
                "action": {
                    "buttons": buttonOptions
                }
            }
        }
    );

    return data;
}


const MessageImage = (textResponse, number) => {
    const data = JSON.stringify(
        {
            "messaging_product": "whatsapp",    
            "recipient_type": "individual",
            "to": number,
            "type": "image",
            "image": {
                "link": "https://i.imgur.com/APGvj9N.jpg",
                "caption": textResponse    
            }
        }
    );

    // const name = true;
    // return [data, name];
    return data;
}

module.exports = {
    MessageText,
    MessageTextName,
    ButtonMessage,
    MessageImage
}