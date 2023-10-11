import FormData from 'form-data';
import fs from 'fs';
import fetch from "node-fetch";

let username = "";
let password = "";
let deviceUrl = "http://192.168.0.25:5000/images"

let headers = {};
headers['Authorization'] = 'Basic ' + Buffer.from(username + ":" + password).toString('base64');

[32, 33, 34, 35, 36, 37, 38, 40].forEach(async id => {
    for (var i = 0; i < 50; i++) {
        const pid = "bn" + id;
        console.log("Uploading " + i + " file for " + pid);
    
        const form = new FormData();
        form.append('empty', "0");
        form.append('pid', pid);
        form.append('date', '000000001');
        form.append('devID', 'bd050');
        form.append('type', 'IRIS');
        form.append('sessionID', '1');
        form.append('check', '2862827836');
        form.append('meta', '5MB_IMAGE');
        form.append('im', fs.createReadStream("./5MB.jpg"  ));
    
        
        await fetch(deviceUrl, {method: 'POST', headers: headers, body: form })
            .catch(error => console.log("error", error));
    }    
})
