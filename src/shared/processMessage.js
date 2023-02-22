const whatsappModel = require('../shared/whatsappModels');
const whatsappService = require('../services/whatsappService');
const templatesMessages = require('../shared/templateMessages');

const {insertPool} = require('../models/operations-pool');
const res = require('express/lib/response');

let statusName2 = false;
let statusAddress = false;
let statusGlobal = false;
let statusMaps = false;

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
        console.log(statusGlobal);

        console.log(statusName2 + '---desde saludo');


    } else if(statusGlobal == true && textFormateado != '' && textFormateado.includes('1') && statusName2 == false) {

        let model = whatsappModel.MessageText('Necesito validar tu nombre para la entrega de tu orden.', number);
        models.push(model);
        let modelName = whatsappModel.MessageTextName('Por favor, compárteme tu *nombre.* _(Ej: Maria Avelar)_', number);
        models.push(modelName);

        statusName2 = true;
        // statusGlobal = true;


        // console.log(statusGlobal);
        console.log(statusName2 + '---desde peticion nombre');

    } else if(textFormateado != '' && textFormateado.includes('2')) {

        let model = whatsappModel.MessageText('Por ahora solo esta la opcion numero 1 disponible. Por favor selecciona la opcion disponible😀.', number);
        models.push(model);

        // statusName2 = true;

        console.log(statusName2 + '---desde peticion buzon');
        // console.log(statusGlobal);


    } else if(statusGlobal == true &&  textFormateado != '' && statusName2 == true && statusAddress == false){

        name1 = textUser;
        console.log(name1);

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
            }
            // (result) => {
            //     res.json(result)
            // }
        )

        let model = whatsappModel.MessageText(`Excelente, *${name1}.*`, number);
        models.push(model);

        let modelDireccion = whatsappModel.MessageText(`Por favor, envíame tu dirección completa en una sola linea`, number);
        models.push(modelDireccion);

        statusAddress = true;
        // statusGlobal = true;

        // console.log(statusGlobal);


        // console.log(statusName2 + '---desde ya el nombre');

    } else if(statusGlobal == true && textFormateado != '' && statusName2 == true && statusAddress == true && statusMaps == false) {
        addressEscrita = textUser;
        // let model = whatsappModel.MessageText(`Tu pedido sera entregado en:, *${addressEscrita}.*`, number);
        const buttOpt = [
            {
                "type": "reply",
                "reply": {
                    "id": "idButtonSiContinuar",
                    "title": "Sí"
                }
            },
            {
                "type": "reply",
                "reply": {
                    "id": "idButtonNoContinuar",
                    "title": "No"
                }
            }
        ]
        
        const data = `Tu pedido sera entregado en:, *${addressEscrita}.* \n\n` + 
                     '¿Continuamos?';
        
        let model = whatsappModel.ButtonMessage(data, buttOpt, number);
        models.push(model);
        statusMaps = true;
        console.log('global: desde direccion validada ' + statusGlobal);
        console.log('statusName2 ' + statusName2);
        console.log('statusAddress' + statusAddress);
        
        console.log('en mayuscula: ' + textFormateado.includes('idButtonSiContinuar'))
        console.log('en miniscula: ' + textFormateado.includes('idbuttonsicontinuar'))


    } else if (statusGlobal == true && textFormateado != '' && statusName2 == true && statusAddress == true && statusMaps == true) {

        let modelDireccionMaps = whatsappModel.MessageText(`Compárteme tu ubicación para encontrar un restaurante cerca de ti.🔍`, number);
        models.push(modelDireccionMaps);
        console.log('mapssss')

    } else {
        console.log('global: desde error final-- ' + statusGlobal);
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