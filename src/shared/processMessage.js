const whatsappModel = require('../shared/whatsappModels');
const whatsappService = require('../services/whatsappService');
const templatesMessages = require('../shared/templateMessages');

const Process = (textUser, number) => {
    textUser = textUser.toLowerCase();
    let models = [];

    if(textUser.includes('hola')|| textUser.includes('buenos dias') || textUser.includes('buenas tardes') || textUser.includes('buenas noches')){
        let template = templatesMessages.SaludoBienvenida();
        let model = whatsappModel.MessageText(template, number);

        models.push(model);

    } else {
        let template = templatesMessages.SaludoBienvenida();
        let model = whatsappModel.MessageText('No entiendo lo que tratas de decir. Por favor, ingresa una opcion valida.', number);

    }


    models.forEach(model => {
        whatsappService.SendMessageWhatsapp(model);    
    });

        
}



module.exports = {
    Process
}