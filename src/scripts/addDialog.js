/**
 * Created by gamer on 2017-04-05.
 */
let dialog;
const path = require('path');
const url = require('url');

exports.openAddDialog = () => {
    if (dialog) {
        return;
    }

    const remote = require('electron').remote;
    const BrowserWindow = remote.BrowserWindow;

    dialog = new BrowserWindow({width: 460, height:240, frame:false});

    // and load the index.html of the app.
    dialog.loadURL(url.format({
        pathname: path.join(__dirname, '../mainWindow/dialog.html'),
        slashes: true
    }));

    // Open the DevTools.
    dialog.webContents.openDevTools();

    // Emitted when the window is closed.
    dialog.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        dialog = null;
    });

    remote.require("./scripts/dataStore").setDialog(dialog);
};

exports.closeDialog = () => {
    // dialog.close();
    let dialog = require("electron").remote.require("./scripts/dataStore").getDialog();
    console.log(dialog);
    dialog.destroy();
    console.log("destroyed");
};