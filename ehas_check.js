
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

let username = "Alejandra";
let password = "?District1";
let deviceUrl = "http://172.17.4.242:5000/check"

let headers = {};
headers['Authorization'] = 'Basic ' + Buffer.from(username + ":" + password).toString('base64');
headers['Accept'] = 'application/json';

let pid = "";
let form = new FormData();
form.append('empty', "0");
form.append('pid', "jT001");
form.append('sessionID', "3");
form.append('devID', '0c245000ab0cb3fa');
form.append('type', 'IRIS');


await fetch(deviceUrl, { method: 'POST', headers: headers, body: form }).then(response => response.json())
.then(response => console.log(JSON.stringify(response)))
