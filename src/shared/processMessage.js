const whatsappModel = require('../shared/whatsappModels');
const whatsappService = require('../services/whatsappService');
const templatesMessages = require('../shared/templateMessages');

const {insertPool, selectCoordsStored} = require('../models/operations-pool');
const res = require('express/lib/response');
const mysql = require('mysql');
const axios = require('axios');

// const pool = require('../../conn');

// const poolConnection = pool;

const pool = mysql.createPool({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DATABASE,
    ssl: {
        rejectUnauthorized: true,
    }
})


let statusName2 = false;
let statusAddress = false;
let statusGlobal = false;
let statusMaps = false;
let statusLocation = false;
let statusFindStore = false;

const Process = (textUser, number) => {

    console.log('desde process', textUser);
    // console.log('desde process textbody', (textUser['text'])['body']);
    // console.log('desde process typeObjet', textUser.text.body);
    const textFormateado = textUser;
/*
    let textUserLower;
    if (typeof textUser == "string"){
        textUserLower = textUser.toLowerCase();
        console.log('textUserLower: ' + textUserLower);
    } else {
        textUserLower = textUser;
    }
    const textFormateado = quitarAcentos(textUserLower);
    */
    let name1 = '';
    let addressEscrita = '';
    // let name3 = false;


    let models = [];

    // console.log('textUser: ' + textUser);
    // console.log('textFormateado: ' + textFormateado);
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
        statusGlobal = true;


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
        statusGlobal = true;

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
        statusGlobal = true;

        console.log('global: desde direccion validada ' + statusGlobal);
        console.log('statusName2 ' + statusName2);
        console.log('statusAddress' + statusAddress);
        
        console.log('en mayuscula: ' + textFormateado.includes('idButtonSiContinuar'))
        console.log('en miniscula: ' + textFormateado.includes('idbuttonsicontinuar'))


    } else if (statusGlobal == true && textFormateado != '' && statusName2 == true && statusAddress == true && textFormateado.includes('idbuttonsicontinuar') && statusMaps == true) {
        
        let modelDireccionMaps = whatsappModel.MessageText(`Compárteme tu ubicación para encontrar un restaurante cerca de ti.🔍`, number);
        models.push(modelDireccionMaps);
        const data = '*Recuerda* que solo puedes compartir tu ubicación desde el celular. 📲 \n' +
                     'Para *IOS* ingresa a la sección con el signo ➕ \n' +
                     'Para *Android* ingresa a la sección con el icono 📎';
                     
        let modelDireccionMaps2 = whatsappModel.MessageImage(data, number);
        models.push(modelDireccionMaps2);

        statusLocation = true;
        statusGlobal = true;

        console.log('mapssss');
        

    } else if(statusGlobal == true && textFormateado != '' && statusName2 == true && statusAddress == true && statusLocation == true) {

        console.log('global: desde loc ' + statusGlobal);
        console.log('statusName2Loc ' + statusName2);
        console.log('statusAddressLoc ' + statusAddress);
        console.log('statusLocation ' + statusLocation);
        console.log('Estamos desde el location:  ' + textFormateado);
        console.log('Estamos desde el location lat:  ' + textFormateado[0]);
        console.log('Estamos desde el location long:  ' + textFormateado[1]);


        const coordLat = textFormateado[0];
        const coordLog = textFormateado[1];
        
        pool.query("SELECT * FROM store", function (err, result, fields) {
          if (err) throw err;
    
          // Crear un array con objetos de la latitud y longitud de cada tienda
          const coords = [];
          result.forEach(element => {
            // console.log(element)
            coords.push({'lat': element.lat, 'log': element.log, 'id': element.id});
      
          });

         
          // Hacer llamado a la API de maps para obtener las distancias entre rutas pasadas por coordenadas
          const getDistance = async (coord) => {
            const resp = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${coordLat}%2C${coordLog}&destinations=${coord.lat}%2C${coord.log}%7C&units=metric&key=${process.env.API_MAPS}&callback`);
      
            return {'id': coord.id, 'km': resp.data.rows[0].elements[0].distance.value};
          };
          
          // Iterando la respuesta recibida por MAPS
          
          const kmCoord = [];
          const compareCoord = Promise.all(coords.map(getDistance))
          .then(kmDistance => {
            kmDistance.map(res => {
              // console.log(res)
              kmCoord.push(res.km)
              
            })
            console.log(kmCoord)

            //Distancia mas cercana
            const minCoord = Math.min(...kmCoord);
            console.log('minCoord', minCoord)
      
            //Tienda mas cercana con su id
            const findCoord = kmDistance.find(value => value.km == minCoord)
            console.log('findCoor', findCoord)

            // pool.release();


            //Seleccionar el store mas cercano
            pool.query("SELECT * FROM store WHERE id = ?", [findCoord.id], function (err, result, fields) {
                console.log('estoy en la segunda consulta')
                if (err) throw err;
                const data = '¡Perfecto! Hemos encontrado un restaurante cerca de ti para enviar tu orden. 🍽 \n' +
                             `*Restaurante: ${result[0].name_store}*`;
                let model = whatsappModel.MessageText(data, number);
                models.push(model);

                const data2 = 'Selecciona tu pedido en el siguiente link. \n' +
                              '*Preparate* porque todo se te va antojar. 😋' +
                              'https://store82202526.company.site/products/';

                let model2 = whatsappModel.MessageText(data2,number, url = true)
                models.push(model2);

                console.log('result', result)
                console.log('models', models)


                models.forEach(model => {
                    whatsappService.SendMessageWhatsapp(model);    
                });
            
                statusFindStore = true
            })
            
          })

        //   console.log('models desde fuera', models)

              
        });

    }else {
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