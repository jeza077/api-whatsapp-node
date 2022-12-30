const whatsappModel = require('../shared/whatsappModels');
const whatsappService = require('../services/whatsappService');
const templatesMessages = require('../shared/templateMessages');

const Process = (textUser, number) => {
    textUser = textUser.toLowerCase();
    const textFormateado = removeAccents(textUser);

    let models = [];

    if(textFormateado.includes('hola')|| textFormateado.includes('buenos dias') || textFormateado.includes('buenas tardes') || textFormateado.includes('buenas noches')){
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

const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  } 

module.exports = {
    Process
}