/**
 * Created by gamer on 2017-04-05.
 */
const fs = require("fs");

exports.getSteamKeys = function (callback) {
    getKeys(callback);
};

exports.addSteamKey = function (name, key, callback) {
    getKeys((data) => {
        data.push({
            name: name,
            key: key
        });

        fs.writeFile("keys.json", JSON.stringify(data), (err) => {
            callback();
        });
    });
};

function getKeys(callback) {
    if (fs.existsSync("keys.json")) {
        fs.readFile("keys.json", (err, data) => {
            callback(JSON.parse(data.toString()));
        });
    } else {
        callback([]);
    }
}