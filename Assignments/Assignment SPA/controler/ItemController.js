//Item-------------------------------
//Save Item
// Save Item Button
$("#btnSaveItem").click(function () {

    $("#confirmSaveItem").off("click");

    $("#confirmSaveItem").click(function () {
        saveItem();
        clearAllItemTxt();
        loadAllItems();
        generateItemID();
        swal("Success!", "Item has been saved!", "success");

    });

});

// Clear Item Button
$("#btnClearItem").click(function () {
    clearAllItemTxt();
    generateItemID();

});

/*Clear the text fields*/
function clearAllItemTxt() {
    $('#txtItemName,#txtQTY,#txtPrice').val("");
    $('#txtItemName,#txtQTY,#txtPrice').css('border', '2px solid #ced4da');
    $("#btnSaveItem").attr('disabled', true);
    loadAllItems();
    /*$("#lblcusid,#lblcusname,#lblcusaddress,#lblcussalary").text("");*/
}

/*Save Item*/
function saveItem() {
    //gather Item information
    let itemID = $("#txtItemID").text();
    let itemName = $("#txtItemName").val();
    let QTY = $("#txtQTY").val();
    let price = $("#txtPrice").val();

    if (isExists(itemID)){
        for (var i of itemDB) {
            if (itemID===i.getitemID()){
                i.setitemName(itemName);
                i.setQTY(QTY);
                i.setPrice(price);
                return;
            }
        }

    }else {
        //create Object
        /*console.log(true);*/
        var itemObject = new Item(itemID, itemName, QTY, price);
        itemDB.push(itemObject);
    }
}

//Check the
function isExists(id) {
    for (var i of itemDB){
        if (id===i.getitemID()){
            return true;
        }
    }
    return false;

}

/*Display Item in the Table*/
function loadAllItems() {
    $("#ItemTableBody").empty();
    for (var i of itemDB) {
        /*create a html row*/
        let row = `<tr><td>${i.getitemID()}</td><td>${i.getitemName()}</td><td>${i.getQTY()}</td><td>${i.getPrice()}</td></tr>`;
        /*select the table body and append the row */
        $("#ItemTableBody").append(row);
    }

    //bind the events to the table rows after the row was added
    $("#ItemTableBody>tr").click(function () {
        let itemID= $(this).children(":eq(0)").text();
        let itemName = $(this).children(":eq(1)").text();
        let qty = $(this).children(":eq(2)").text();
        let price = $(this).children(":eq(3)").text();

        // set values for the input fields
        $("#txtItemID").text(itemID);
        $("#txtItemName").val(itemName);
        $("#txtQTY").val(qty);
        $("#txtPrice").val(price);

        $("#btnSaveItem").html("Update Item");
        $("#btnSaveItem").attr("class","btn btn-outline-warning");

    });
}

// search Item
$("#btnSearchItem").click(function () {
    var searchID = $("#txtSearchItem").val();

    var response = searchItem(searchID);
    if (response) {
        $("#txtItemID").text(response.getitemID());
        $("#txtItemName").val(response.getitemName());
        $("#txtQTY").val(response.getQTY());
        $("#txtPrice").val(response.getPrice());
    } else {
        clearAllItemTxt();
        alert("No Such a Item");
    }
});

function searchItem(id) {
    for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].getitemID() === id) {
            return itemDB[i];
        }
    }
}

//Genereate Item ID
function generateItemID() {
    if (itemDB.length !== 0) {
        let id = itemDB[(itemDB.length) - 1].getitemID();
        const txt = id.split('I', 2);
        console.log(txt);
        let newID = parseInt(txt[1]) + 1;
        console.log(newID);

        if (newID <= 9) {
            $("#txtItemID").text("I00" + newID);
        } else if (newID <= 99) {
            $("#txtItemID").text("I0" + newID);
        } else if (newID <= 999) {
            $("#txtItemID").text("I" + newID);
        }

    } else {
        $("#txtItemID").text("I001");
    }

}

//Customer validation started
// customer regular expressions
const itemNameRegEx = /^[A-z ]{5,20}$/;
const qtyRegEx = /^[0-9]{1,}$/;
const priceRegEx = /^[0-9]{1,}$/;


$('#txtItemName,#txtQTY,#txtPrice').on('keydown', function (eventOb) {
    if (eventOb.key == "Tab") {
        eventOb.preventDefault(); // stop execution of the button
    }
});

$('#txtItemName,#txtQTY,#txtPrice').on('blur', function () {
    formValid();
});

//focusing events
$("#txtItemName").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }

});


$("#txtQTY").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#txtPrice").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});
// focusing events end
$("#btnSaveItem").attr('disabled', true);

function formValid() {
    var itenName = $("#txtItemName").val();
    if (itemNameRegEx.test(itenName)) {
        $("#txtItemName").css('border', '2px solid green');
        $("#lblItemName").text("");
        var qty = $("#txtQTY").val();
        if (qtyRegEx.test(qty)) {
            var price = $("#txtPrice").val();
            var resp = priceRegEx.test(price);
            $("#txtQTY").css('border', '2px solid green');
            $("#lblqty").text("");
            if (resp) {
                $("#txtPrice").css('border', '2px solid green');
                $("#lblprice").text("");
                return true;
            } else {
                $("#txtPrice").css('border', '2px solid red');
                $("#lblprice").text("Cus Salary is a required field : Pattern 100.00 or 100");
                return false;
            }
        } else {
            $("#txtQTY").css('border', '2px solid red');
            $("#lblqty").text("Cus Name is a required field : Mimum 7");
            return false;
        }
    } else {
        $("#txtItemName").css('border', '2px solid red');
        $("#lblItemName").text("Cus Name is a required field : Mimimum 5, Max 20, Spaces Allowed");
        return false;
    }
}

function checkIfValid() {
    var itemName = $("#txtItemName").val();
    if (itemNameRegEx.test(itemName)) {
        $("#txtQTY").focus();
        var qty = $("#txtQTY").val();
        if (qtyRegEx.test(qty)) {
            $("#txtPrice").focus();
            var price = $("#txtPrice").val();
            var resp = priceRegEx.test(price);
            if (resp) {

            } else {
                $("#txtPrice").focus();
            }
        } else {
            $("#txtQTY").focus();
        }
    } else {
        $("#txtItemName").focus();
    }
}

function setButton() {
    let b = formValid();
    if (b) {
        $("#btnSaveItem").attr('disabled', false);
    } else {
        $("#btnSaveItem").attr('disabled', true);
    }
}

$('#btnSaveItem').click(function () {
    checkIfValid();
});
//validation ended