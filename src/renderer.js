/**
 * Created by gamer on 2017-04-04.
 */
const d = require("./scripts/addDialog");

const addAllRowsFromDB = function() {
    $("#keyTable tbody").html("");
    require("electron").remote.require("./scripts/dataStore").getReader().getSteamKeys((data) => {
        for (const row of data) {
            $("#keyTable tbody").append("<tr class='edit' data-key='" + row.key + "'><td></td><td>" + row.name + "</td><td>XXXX-XXXX-XXXX-XXXX</td></tr>");
        }
    });
};

$("#addKey").click(function() {
    d.openAddDialog();
});

$("#refresh").click(function() {
    addAllRowsFromDB();
});

addAllRowsFromDB();

// contextmenu
const {remote} = require('electron');
const {Menu, MenuItem} = remote;

const menu = new Menu();
menu.append(new MenuItem({label: 'showKey', click() { console.log('item 1 clicked') }}));
menu.append(new MenuItem({type: 'separator'}));
menu.append(new MenuItem({label: 'remove', click() { console.log('item 2') }}));

$("html").on('contextmenu', 'tr.edit', () => {
    menu.popup(remote.getCurrentWindow());
});