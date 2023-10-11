/*
Primer paso: ejecutar la app de Android en un dispositivo real y preferiblemente en debugger para poder ver los posibles fallos (en el emulador no se cual es el puerto para conectarse contra la API de la aplicación)
Segundo paso: Indicar la ip del dispositivo (el puerto en la aplicacion definido es el 5000 por defecto), además poner las credenciales de la app
Tercer paso: El pid debemos cambiarlo y los valores del array tambien. Si vamos a https://test.dhis2.ehas.org/ y pulsamos sobre el cubo de puntos --> capture --> IMAGES CAPTURE --> Selected registering unit (seleccionamos la que haya). Nos sale una tabla que empieza con bt o bn y a continuación elegimos unos valores que no hayan sido utilizados (este error dará en la otra aplicación).
Cuarto paso: Si el device id no existe da error al tratar de enviar los datos al test2.dhis (este error dará en la otra aplicación).
Quinto paso: Si se sube una imagen nueva el Check debemos cambiarlo porque es propio de cada imagen (es un valor de comprobación para validar que la imagen no haya sido corrompida) El error daría en ImagesActivity.java linea 653
Sexto paso: Si cambias el nombre de la imagen debes también cambiarlo en la etiqueta meta del form enviado
*/

import FormData from 'form-data';
import fs from 'fs';
import fetch from "node-fetch";

// let username = "ITAE";
// let password = "?RDominicana1";


let username = "admin";
let password = "district";
//let deviceUrl = "http://192.168.1.142:5000/images"
let deviceUrl = "http://192.168.1.142:5000/images"

let headers = {};
headers['Authorization'] = 'Basic ' + Buffer.from(username + ":" + password).toString('base64');

[38, 37, 36].forEach(async id => { // , 25, 26, 27, 28, 29, 30
    for (var i = 0; i < 15; i++) {
        const pid = "a" + id;
        console.log("Uploading " + i + " file for " + pid);
    
        const form = new FormData();
        form.append('empty', "0");
        form.append('pid', pid);
        form.append('date', '000000001');
        form.append('devID', '0c245000ab0cb3fa');
        form.append('type', 'IRIS');
        form.append('sessionID', '3');
        form.append('check', '3512392976');
        form.append('meta', 'foto.jpg');
        form.append('im', fs.createReadStream("./foto.jpg"  ));


        await fetch(deviceUrl, {method: 'POST', headers: headers, body: form }).then(res => {
                if(!res.ok) {
                    console.log(res);
                }
            })
            .catch(error =>
            {
                console.log("error", error)
            });
    }    
})

