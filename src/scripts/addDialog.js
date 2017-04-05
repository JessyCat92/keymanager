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
    const mainWindow = BrowserWindow.getAllWindows()[0];
    const pos = mainWindow.getPosition();
    const size = mainWindow.getSize();

    dialog = new BrowserWindow(
        {
            width: 460,
            x: (pos[0] + size[0]/2 - 230),
            height:240,
            y: (pos[1] + size[1]/2 - 120),
            frame:false,
            parent: BrowserWindow.getAllWindows()[0]
        });

    mainWindow.on('minimize', () => {
        dialog.minimize();
    });

    mainWindow.on('restore', () => {
        dialog.restore();
    });

    mainWindow.on('move', () => {
        const mainWindow = BrowserWindow.getAllWindows()[0];
        const pos = mainWindow.getPosition();
        const size = mainWindow.getSize();

        dialog.setPosition((pos[0] + size[0]/2 - 230), (pos[1] + size[1]/2 - 120), true);
    });

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
    let dialog = require("electron").remote.require("./scripts/dataStore").getDialog();
    dialog.destroy();
};