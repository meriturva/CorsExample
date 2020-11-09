const express = require('express');
var cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000

app.use(express.static('publicHomeBank'));
app.use(express.json());
app.use(cookieParser());

// Qui, come sviluppatore del software della banca, commetto l'errore di abilitare il cors!!!
var corsConfiguration = {
    origin: function(origin, callback){
        return callback(null, true);
      },
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "credentials": true,
    "optionsSuccessStatus": 204
  }
app.use(cors(corsConfiguration));

app.post('/login', (req, res) => {
    console.log("Ricevuto una login con questi dati:", req.body);
    if(req.body.username == "diego" && req.body.password == "bonura") {
        console.log("L'utente " + req.body.username + "ha effettuato correttamente il login")
        // Ok va tutto bene
        res.cookie('cookieAutenticazione', 'loginOk')
        res.send('Ok');
    } else {
        console.log("Errore login")
        res.clearCookie("cookieAutenticazione");
        res.status("403", "Login errato").send();
    }
});

app.post('/effettuaBonifico', (req, res) => {
    if(req.cookies.cookieAutenticazione == "loginOk"){
        console.log("Ricevuto bonifico dalla banca correttamente:", req.body);
        res.send("Ok");
    } else {
        console.log("Cookie non trovato");
        res.status("403", "Accesso negato").send();
    }
});

app.listen(port, () => {
    console.log(`HomeBanking listening at http://localhost:${port}`)
});