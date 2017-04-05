/**
 * Created by gamer on 2017-04-04.
 */
const d = require("./scripts/addDialog");

const addAllRowsFromDB = function() {
    $("#keyTable tbody").html("");
    require("electron").remote.require("./scripts/dataStore").getReader().getSteamKeys((data) => {
        for (const rowId in data) {
            if (data.hasOwnProperty(rowId)) {
                let row = data[rowId];
                $("#keyTable tbody").append("<tr class='edit' data-id = '" + row.id + "' data-key='" + row.key + "'><td>" + row.id + "</td><td>" + row.name + "</td><td class='key'>XXXX-XXXX-XXXX-XXXX</td></tr>");
            }
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
const {remote, clipboard} = require('electron');
const {Menu, MenuItem} = remote;

let lastClickedItem;
const menu = new Menu();
menu.append(new MenuItem({label: 'showKey', click() {
    lastClickedItem.find("td.key").html(lastClickedItem.attr("data-key"));
}}));

menu.append(new MenuItem({label: 'copyKey', click() {
    clipboard.writeText(lastClickedItem.attr("data-key"));
}}));

menu.append(new MenuItem({type: 'separator'}));

menu.append(new MenuItem({label: 'remove', click() {
    require("electron").remote.require("./scripts/dataStore").getReader().removeKey(lastClickedItem.attr("data-id"), () => {
        addAllRowsFromDB();
    });
}}));

$("html").on('contextmenu', 'tr.edit', function() {
    lastClickedItem = $(this);
    menu.popup(remote.getCurrentWindow());
});