const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {

    const reqBreaked = req.url.split("?");

    if (reqBreaked[0] === "/decode" && req.method == "POST") {

        let body = '';
        req.on('data', function (chunk) {
            body += chunk;
        });

        req.on('end', () => {
            var jsonBody = JSON.parse(body);
            res.end("A String é traduzida como: " + invertAndConvert(jsonBody.encoded));
        });

    } 
    else if(reqBreaked[0] === "/decode" && req.method == "GET") {
        var data = reqBreaked[1].split("=")

        res.setHeader('Content-Type', 'application/json');

        if (data.length > 2) {
            res.statusCode = 400;
            res.end('É preciso passar apenas um parâmetro');
            return
        }

        res.statusCode = 200;
        res.end("A String é traduzida como: " + invertAndConvert(data[1]));
    } 
    else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end('Esta pagina esta vazia');
    }
});

server.listen(port, hostname, () => {
    console.log(`Servidor esta em http://${hostname}:${port}/`);
});

function convertIntoString(text, finalText = '') {
    if (!text.length) {
        return finalText;
    }
    let lengthOfChar = 2;
    let ascNumber = text.substring(0, lengthOfChar);
    if (ascNumber != 32 && ascNumber < 65) {
        lengthOfChar = 3;
    }
    ascNumber = text.substring(0, lengthOfChar);
    return convertIntoString(text.slice(lengthOfChar), finalText + String.fromCharCode(ascNumber));
}

function invertAndConvert(text) {
    const invertedText = text.split('').reverse().join('');
    return convertIntoString(invertedText);
}