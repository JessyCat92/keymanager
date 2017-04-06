const express = require('express');
const app = express();

app.get('/', function (req, res) {
    require("../scripts/dataStore").getReader().getSteamKeys((keys) => {
        let keysToArray = [];
        for (const keyId in keys) {
            if (keys.hasOwnProperty(keyId)) {
                keysToArray.push(keys[keyId]);
            }
        }

        if (keysToArray.length > 0) {
            const id = Math.round(Math.random() * (keysToArray.length - 1));
            require("../scripts/dataStore").getReader().removeKey(keysToArray[id].id, () => {
            });
            res.send(keysToArray[id].name + ": " + keysToArray[id].key);
        } else {
            const cost = req.query.cost;
            const user = req.query.user;
            const apiCode = req.query.apicode;

            const WebSocket = require('ws');
            const ws = new WebSocket('ws://localhost:3337/');
            ws.on('open', function() {
                console.log('sending API registration');
                ws.send('api|register|' + apiCode);
            });

            ws.on('close', function close() {
                console.log('disconnected');
            });
            ws.on('message', function(message) {
                const json = JSON.parse(message);
                if (json.function === "register") {
                    ws.send('api|add_points|' + user + '|' + cost);
                } else if (json.function === "add_points") {
                    ws.close();
                }
            });


            res.send("No Key Available");
        }

    });
});

app.listen(12345, function () {
    console.log('Example app listening on port 12345!');
});