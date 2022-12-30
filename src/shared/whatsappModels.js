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


module.exports = {
    MessageText,
    MessageTextName
}