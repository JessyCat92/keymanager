/**
 * Created by gamer on 2017-04-04.
 */
const d = require("./scripts/addDialog");

const addAllRowsFromDB = function() {
    $("#keyTable tbody").html("");
    for (let i = 0; i < 10; i++) {
        $("#keyTable tbody").append("<tr><td>" + i + "</td><td>Test</td><td>XXXX-XXXX-XXXX-XXXX</td></tr>");
    }
};

$("#addKey").click(function() {
    d.openAddDialog();
});

$("#refresh").click(function() {
    addAllRowsFromDB();
});

addAllRowsFromDB();