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
                    "buttons": [
                        {
                            "type": "reply",
                            "reply": {
                                "id": "idButton1",
                                "title": "Sí"
                            }
                        },
                        {
                            "type": "reply",
                            "reply": {
                                "id": "idButton2",
                                "title": "No"
                            }
                        }
                    ]
                }
            }
        }
    );

    return data;
}


module.exports = {
    MessageText,
    MessageTextName,
    ButtonMessage
}