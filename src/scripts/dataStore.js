/**
 * Created by gamer on 2017-04-05.
 */
let dialog;
let keyData = require("./keyreader");

exports.setDialog = function(setDialog) {
    dialog = setDialog;
};

exports.getDialog = function() {
    return dialog;
};

exports.getReader = function() {
    return keyData;
};