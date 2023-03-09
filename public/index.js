const { Process } = require("../src/shared/processMessage");

const botId = '101999332771661';
const phoneNbr = '50431415039';
// const bearerToken = 'EAAubQGSCTC8BAFD3tSaMTYIfWa0ZA1c2f1WQEVnl4cXB7kwtTtnpK2CSVut78inAzagFN15arLgh6dBFlIlK8vlmq0uSKv7vqrq2PgFR1iGMSZB18JPvBsvJji7yZAPuSGtoJ9G2RHKuR71TsbFIbLF42WtDI1zeEMAg9wysK4zHHKqLa2o';

/*
const urlWA = 'https://graph.facebook.com/v15.0/' + botId + '/messages';
const data = {
  messaging_product: 'whatsapp',
  to: phoneNbr,
  type: 'text',
  text: {
    preview_url: false,
    body: 'holaaaa'
}
};

const postReq = {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + bearerToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
    json: true
  };
*/
/* 

    TAREA DE ESTE MIERCOLES:
        YA PROBE QUE FUNCIONA AHORA DEBO PASAR ESTO AL CODGIO DEL BOT Y DEBO CREAR LO SIGUIENTE:
        1- CREAR ARCHIVO HTML Y JS EN UNA CARPETA PUBLIC.
        2- EN NODE, CREAR EL app.use(express.static(__dirname + '/public')).
        3- CREAR LA RUTA /CHATBOT EN LA CUAL SE EJECUTARA ESTA PARTE DEL CODIGO.

*/



// fetch(url, postReq)
//   .then(data => {
//     return data.json()
//   })
//   .then(res => {
//     console.log(res)
//   })
//   .catch(error => console.log(error));
        
    
    const backWA = document.getElementById('backWA');

    backWA.addEventListener("click", (e) => {
    const numnberWA = document.getElementById('numberWA').value;
    // e.preventDefault();
    console.log(numnberWA)

    // const fetch = require('node-fetch');

    // Obtener las ordenes de ECWID
    const url = 'https://app.ecwid.com/api/v3/82202526/orders';
    const options = {
        method: 'GET',
        headers: {accept: 'application/json', Authorization: 'Bearer secret_KFCSzdTvExP3g2CF9xCUc4Pi3APGGC4m'}
    };

    fetch(url, options)
        .then(res => res.json())
        .then(orders => {
        console.log(orders.items)
        // Obtener IP del cliente
        const URL_API = "https://api.ipify.org/?format=json";
        fetch(URL_API)
            .then(respuestaRaw => respuestaRaw.json())
            .then(respuesta => {
                const ipClient = respuesta.ip;
                console.log(ipClient)

                const foundOrder = orders.items.find(ip => ip.ipAddress == ipClient && ip.paymentStatus == 'AWAITING_PAYMENT');
                console.log(foundOrder.items)
                if(!foundOrder) {
                console.log('error en ip')
                } 
                else {

                // Obteniendo el nombre de los productos de la orden
                let dataOrder = [];
                foundOrder.items.map(order => {
                    console.log(order.name)
                })

                console.log('dataOrder:', dataOrder)


                // ENVIO DE MENSAJE DE LA ORDEN AL CLIENTE
                const urlWA = 'https://graph.facebook.com/v15.0/' + botId + '/messages';
                const data = {
                    messaging_product: 'whatsapp',
                    to: numnberWA,
                    type: 'text',
                    text: {
                        preview_url: false,
                        body: dataOrder
                    }
                };

                const postReq = {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + process.env.TOKEN_WA,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data),
                    json: true
                };

                fetch(urlWA, postReq)
                .then(data => {
                    return data.json()
                })
                .then(res => {
                    console.log(res)
                })
                .catch(error => console.log(error));
                }
            });
        })
        .catch(err => console.error('error:' + err));


        



    })


