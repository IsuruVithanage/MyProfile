//Order-------------------------
//Load All Customer ID s in to the ComboBox
function loadAllCustID() {
    $("#CustomerOID").empty();
    for (var i = 0; i < customerDB.length; i++) {
        $("#CustomerOID").append(new Option(customerDB[i].getCustID()));
    }
}

//Load All Item ID s in to the ComboBox
function loadAllItemID() {
    $("#itemID").empty();
    for (var i = 0; i < itemDB.length; i++) {
        $("#itemID").append(new Option(itemDB[i].getitemID()));
    }
}


//Add listener to the ComboBox
$("#CustomerOID").click(function () {
    var id = $('#CustomerOID').find(":selected").text();

    for (var i = 0; i < customerDB.length; i++) {
        if (id === customerDB[i].getCustID()) {
            $("#Name").val(customerDB[i].getCustName());
            $("#Salary").val(customerDB[i].getCustSalary());
            $("#address").val(customerDB[i].getCustAddress());
            return;

        }
    }


});

//Add listener to the Item ComboBox
$("#itemID").click(function () {
    var id = $('#itemID').find(":selected").text();

    for (var i = 0; i < itemDB.length; i++) {
        if (id === itemDB[i].getitemID()) {
            $("#iname").val(itemDB[i].getitemName());
            $("#qty").val(itemDB[i].getQTY());
            $("#price").val(itemDB[i].getPrice());
            $("#btnAddItem").attr('disabled', false);
            return;

        }
    }



});


//Genereate Customer ID
function generateOrderID() {
    console.log(true);
    if (orderDB.length !== 0) {
        let id = orderDB[(orderDB.length) - 1].getoID();
        const txt = id.split('O', 2);
        let newcustID = parseInt(txt[1]) + 1;

        if (newcustID <= 9) {
            $("#oID").val("O00" + newcustID);
        } else if (newcustID <= 99) {
            $("#oID").val("O0" + newcustID);
        } else if (newcustID <= 999) {
            $("#oID").val("O" + newcustID);
        }

    } else {
        $("#oID").val("O001");
    }

}

$("#btnAddItem").click(function () {
    addItem();
    loadAllBoughtItems();
    clearAllorderitemTxt();

});

$("#btndeleteoitem").click(function () {
    let id = $('#itemID').find(":selected").text();
    for (var i in tempItemList) {
        if (id === tempItemList[i].getitemDetailID()) {
            tempItemList.splice(i, 1);
            clearAllorderitemTxt();
            loadAllBoughtItems();
            return;
        }

    }


});

$("#cancelOrder").click(function () {
    var val = $("#oID").val();

    for (var i in orderDB) {
        if (val === orderDB[i].getoID()) {
            orderDB.splice(i, 1);
            clearAllordercustTxt();
            clearAllorderitemTxt();
            $("#OtblBody").empty();
            generateOrderID();
            return;
        }
    }



});

$("#btnPlaceOrder").click(function () {
    placeOrder();
    clearAllorderitemTxt();
    clearAllordercustTxt();
    $("#OtblBody").empty();
    generateOrderID();


});

$("#btnAdd").click(function () {
    balanceCal();


});

$("#btnupdateOitem").click(function () {
    let id = $('#itemID').find(":selected").text();
    let qty = $('#oqty').val();

    for (var i in tempItemList) {
        if (id === tempItemList[i].getitemDetailID()) {
            tempItemList[i].setbuyQTY(qty);
            loadAllBoughtItems();
            clearAllorderitemTxt();
            return;
        }

    }



});

/*Add a item*/
function addItem() {
    //gather Item information
    let itemID = $('#itemID').find(":selected").text();
    let itemName = $("#iname").val();
    let itemPrice = $("#price").val();
    let oqty = $("#oqty").val();
    let qty = $("#qtyonH").val();

    if (isExistsItemDetail(itemID)) {
        for (var i of tempItemList) {
            if (itemID === i.getitemDetailID()) {
                i.setbuyQTY(parseInt(i.getbuyQTY()) + parseInt(oqty));
                $("#txtTotal").text(updateTotal(itemPrice * (parseInt(oqty))));
                $("#txtSubTotal").text($("#txtTotal").text());
                return;
            }
        }
    } else {
        //create Object
        /*console.log(true);*/
        var item = new ItemDetail(itemID, itemName, itemPrice, oqty, qty);
        tempItemList.push(item);
        $("#txtTotal").text(updateTotal(itemPrice * oqty));
        $("#txtSubTotal").text($("#txtTotal").text());

    }
}

//Place the order
function placeOrder() {
    let oID = $("#oID").val();
    let date = $("#date").val();
    let custID = $('#CustomerOID').find(":selected").text();

    var a = tempItemList;
    var order = new Order(oID, custID, date, a);
    orderDB.push(order);
    tempItemList = [];
    $("#txtTotal").text("0Rs/=");
    $("#txtSubTotal").text("0Rs/=");


}

function balanceCal() {
    const total = parseInt($("#txtTotal").text().split('R', 1));
    var per = $("#txtDiscount").val();
    var cash = $("#txtCash").val();
    var dis = per/100;
    $("#txtSubTotal").text(total-(total*dis));
    $("#txtBalance").val(cash-(total-(total*dis)));




}


//Check the
function isExistsItemDetail(id) {
    for (var i of tempItemList) {
        if (id === i.getitemDetailID()) {
            return true;
        }
    }
    return false;

}

//Update the Total
function updateTotal(ammount) {
    const txt = $("#txtTotal").text().split('R', 1);
    return (parseInt(txt) + ammount) + "Rs/=";

}

// search customer
$("#btnSearchOrder").click(function () {
    var searchID = $("#txtSearchOrder").val();

    var response = searchOrder(searchID);
    if (response) {
        $("#oID").val(response.getoID());
        $("#date").val(response.getdate());
        $("#CustomerOID").val(response.getCustID());
        tempItemList = response.getitemList();
        loadAllBoughtItems();
    } else {
        clearAllCustTxt();
        alert("No Such a Customer");
    }
});

//Serach Customer
function searchOrder(id) {
    for (let i = 0; i < orderDB.length; i++) {
        if (orderDB[i].getoID() == id) {
            return orderDB[i];
        }
    }
}


/*Display customer in the Table*/
function loadAllBoughtItems() {
    $("#OtblBody>tr").off("click");

    $("#OtblBody").empty();
    for (var i of tempItemList) {
        /*create a html row*/
        var itemPrice = i.getitemPrice();
        var buyQTY = i.getbuyQTY();

        let row = `<tr><td>${i.getitemDetailID()}</td><td>${i.getitemDetailName()}</td><td>${itemPrice}</td><td>${buyQTY}</td><td>${buyQTY * itemPrice}</td></tr>`;
        /*select the table body and append the row */
        $("#OtblBody").append(row);
    }

    //bind the events to the table rows after the row was added
    $("#OtblBody>tr").click(function () {
        let itemID = $(this).children(":eq(0)").text();
        let itemName = $(this).children(":eq(1)").text();
        let price = $(this).children(":eq(2)").text();
        let oqty = $(this).children(":eq(3)").text();
        let qty = getQTYOnHand(itemID);

        // set values for the input fields
        $("#itemID").val(itemID);
        $("#iname").val(itemName);
        $("#qty").val(qty);
        $("#oqty").val(oqty);
        $("#price").val(price);


    });
}

//Return the item QTY on hand
function getQTYOnHand(id) {
    for (var i of itemDB) {
        if (id === i.getitemID()) {
            return i.getQTY();
        }
    }

}

/*Clear the text fields*/
function clearAllorderitemTxt() {
    $('#iname,#price,#oqty,#qty').val("");
    $("#btnAddItem").attr('disabled', true);
    loadAllBoughtItems();
}

function clearAllordercustTxt() {
    $('#Name,#Salary,#Address').val("");
    $('#date').val("");
    $("#btnAddItem").attr('disabled', true);
    loadAllBoughtItems();
}