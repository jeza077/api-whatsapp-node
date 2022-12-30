const whatsappModel = require('../shared/whatsappModels');
const whatsappService = require('../services/whatsappService');
const templatesMessages = require('../shared/templateMessages');

let name2 = false;
let address1 = false;

const Process = (textUser, number) => {
    const textUserLower = textUser.toLowerCase();
    const textFormateado = quitarAcentos(textUserLower);
    let name1 = '';
    let address2 = '';
    // let name3 = false;


    let models = [];
  

    if(textFormateado != '' && textFormateado.includes('hola')|| textFormateado.includes('buenos dias') || textFormateado.includes('buenas tardes') || textFormateado.includes('buenas noches')  && name2 == false) {
        let template = templatesMessages.SaludoBienvenida();
        let model = whatsappModel.MessageText(template, number);
        models.push(model);

        console.log(name2 + '---desde saludo');


    } else if(textFormateado != '' && textFormateado.includes('1') && name2 == false) {

        let model = whatsappModel.MessageText('Necesito validar tu nombre para la entrega de tu orden.', number);
        models.push(model);
        let modelName = whatsappModel.MessageTextName('Por favor, compárteme tu *nombre.* _(Ej: Maria Avelar)_', number);
        models.push(modelName);

        name2 = true;

        console.log(name2 + '---desde peticion nombre');

    } else if(textFormateado != '' && textFormateado.includes('2')) {

        let model = whatsappModel.MessageText('Por ahora solo esta la opcion numero 1 disponible. Por favor selecciona la opcion disponible😀.', number);
        models.push(model);

        // name2 = true;

        console.log(name2 + '---desde peticion buzon');

    } else if(textFormateado != '' && name2 == true && address1 == false){
        name1 = textUser;
        let model = whatsappModel.MessageText(`Excelente, *${name1}.*`, number);
        models.push(model);

        let modelDireccion = whatsappModel.MessageText(`Por favor, envíame tu dirección completa en una sola linea`, number);
        models.push(modelDireccion);

        address1 = true;

        // console.log(name2 + '---desde ya el nombre');

    } else if(textFormateado != '' && name2 == true && address1 == true) {
        address2 = textUser;
        let model = whatsappModel.MessageText(`Tu dirrección es:, *${address2}.*`, number);
        models.push(model);

    } else {
        let model = whatsappModel.MessageText('No entiendo lo que tratas de decir. Por favor, ingresa una opcion valida.', number);
        models.push(model);
    }


    models.forEach(model => {
        whatsappService.SendMessageWhatsapp(model);    
    });

    // if(name2 == true) {
    //     name3 = true;
    // }

        
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