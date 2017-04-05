/**
 * Created by gamer on 2017-04-05.
 */

const d = require("./addDialog");

$("#closeAddDialog").click(function(){
    d.closeDialog();
});

$("#addAddDialog").click(function() {
    let name = $("#nameOfGame").val();
    let key = $("#key").val();

    require("electron").remote.require("./scripts/dataStore").getReader().addSteamKey(name, key, () => {
        const remote = require('electron').remote;
        const BrowserWindow = remote.BrowserWindow;
        const mainWindow = BrowserWindow.getAllWindows()[0];
        mainWindow.reload();
        d.closeDialog();
    });
});