/**
 * Created by gamer on 2017-04-05.
 */
const fs = require("fs");
let lastKeyId = 1;

getLastKeyId((data) => {
    lastKeyId = data;
});

exports.getSteamKeys = function (callback) {
    getKeys(callback);
};

exports.addSteamKey = function (name, key, callback) {
    getKeys((data) => {
        lastKeyId++;
        data[lastKeyId] = {
            id: lastKeyId,
            name: name,
            key: key
        };

        fs.writeFile("keys.json", JSON.stringify({
            lastId: lastKeyId,
            keys: data
        }), (err) => {
            callback();
        });
    });
};

exports.removeKey = function (id, callback) {
    getKeys((data) => {
        delete data[id];

        fs.writeFile("keys.json", JSON.stringify({
            lastId: lastKeyId,
            keys: data
        }), (err) => {
            callback();
        });
    });
};

function getKeys(callback) {
    if (fs.existsSync("keys.json")) {
        fs.readFile("keys.json", (err, data) => {
            callback(JSON.parse(data.toString()).keys);
        });
    } else {
        callback({});
    }
}

function getLastKeyId(callback) {
    if (fs.existsSync("keys.json")) {
        fs.readFile("keys.json", (err, data) => {
            callback(JSON.parse(data.toString()).lastId);
        });
    } else {
        callback([]);
    }
}