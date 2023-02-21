const whatsappModel = require('../shared/whatsappModels');
const whatsappService = require('../services/whatsappService');
const templatesMessages = require('../shared/templateMessages');

const {insertPool} = require('../models/operations-pool');
const res = require('express/lib/response');

let statusName2 = false;
let statusAddress = false;
let statusGlobal = false;

const Process = (textUser, number) => {
    const textUserLower = textUser.toLowerCase();
    const textFormateado = quitarAcentos(textUserLower);
    let name1 = '';
    let addressEscrita = '';
    // let name3 = false;


    let models = [];
  
    // console.log(textFormateado);
    // return;
    if(textFormateado != '' && textFormateado.includes('hola')|| textFormateado.includes('buenos dias') || textFormateado.includes('buenas tardes') || textFormateado.includes('buenas noches')  && statusName2 == false) {
        let template = templatesMessages.SaludoBienvenida();
        let model = whatsappModel.MessageText(template, number);
        models.push(model);

        statusGlobal = true;

        console.log(statusName2 + '---desde saludo');


    } else if(statusGlobal == true && textFormateado != '' && textFormateado.includes('1') && statusName2 == false) {

        let model = whatsappModel.MessageText('Necesito validar tu nombre para la entrega de tu orden.', number);
        models.push(model);
        let modelName = whatsappModel.MessageTextName('Por favor, compárteme tu *nombre.* _(Ej: Maria Avelar)_', number);
        models.push(modelName);

        statusName2 = true;

        console.log(statusName2 + '---desde peticion nombre');

    } else if(statusGlobal == true && textFormateado != '' && textFormateado.includes('2')) {

        let model = whatsappModel.MessageText('Por ahora solo esta la opcion numero 1 disponible. Por favor selecciona la opcion disponible😀.', number);
        models.push(model);

        // statusName2 = true;

        console.log(statusName2 + '---desde peticion buzon');

    } else if(textFormateado != '' && statusName2 == true && statusAddress == false){

        //Generar random para guardar numeros distintos
        let random = Math.random();
        random = random * 99 + 1;
        random = Math.trunc(random); //Eliminar decimales
        // console.log(random);

        //Guardar datos de cliente
        insertPool(
            {
                phone_number: `504314150${random}`,
                name: name1,
                last_name: 'Amador',
                lat: '14.135184288025',
                log: '-87.054298400879'
            },
            (result) => {
                res.json(result)
            }
        )
        name1 = textUser;
        let model = whatsappModel.MessageText(`Excelente, *${name1}.*`, number);
        models.push(model);

        let modelDireccion = whatsappModel.MessageText(`Por favor, envíame tu dirección completa en una sola linea`, number);
        models.push(modelDireccion);

        statusAddress = true;

        // console.log(statusName2 + '---desde ya el nombre');

    } else if(textFormateado != '' && statusName2 == true && statusAddress == true) {
        addressEscrita = textUser;
        let model = whatsappModel.MessageText(`Tu pedido sera entregado en:, *${addressEscrita}.*`, number);
        models.push(model);

    } else {
        let model = whatsappModel.MessageText('No entiendo lo que tratas de decir. Por favor, ingresa una opcion valida.', number);
        models.push(model);
    }


    models.forEach(model => {
        whatsappService.SendMessageWhatsapp(model);    
    });

    // if(statusName2 == true) {
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