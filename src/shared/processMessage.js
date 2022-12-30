const whatsappModel = require('../shared/whatsappModels');
const whatsappService = require('../services/whatsappService');
const templatesMessages = require('../shared/templateMessages');

const Process = (textUser, number) => {
    textUser = textUser.toLowerCase();
    quitarAcentos(textUser);
    
    let models = [];

    if(textUser.includes('hola')|| textUser.includes('buenos dias') || textUser.includes('buenas tardes') || textUser.includes('buenas noches')){
        let template = templatesMessages.SaludoBienvenida();
        let model = whatsappModel.MessageText(template, number);

        models.push(model);

    } else {
        let model = whatsappModel.MessageText('No entiendo lo que tratas de decir. Por favor, ingresa una opcion valida.', number);

        models.push(model);
    }


    models.forEach(model => {
        whatsappService.SendMessageWhatsapp(model);    
    });

        
}


const quitarAcentos = (cadena) => {
	const acentos = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};
	return cadena.split('').map( letra => acentos[letra] || letra).join('').toString();	
}


module.exports = {
    Process
}