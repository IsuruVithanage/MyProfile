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

            for (var j of tempItemList) {
                if (j.getitemDetailID() === itemDB[i].getitemID()) {
                    $("#qty").val(itemDB[i].getQTY() - j.getbuyQTY());
                    return
                }
            }

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

//Set the listner to the add button
$("#btnAddItem").click(function () {
    if ($("#iname").val().length > 0 && $("#oqty").val().length > 0 && $.isNumeric($("#oqty").val())) {
        if (parseInt($("#oqty").val()) > parseInt($("#qty").val())) {
            swal("Warning!", "There are no enough stock for this order!", "warning");
        } else {
            addItem();
            loadAllBoughtItems();
            clearAllorderitemTxt();
        }
    } else {
        swal("Warning!", "Order cannot add the item please check!", "warning");
    }

});

//Set the listner to delete button
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

//Cancel Order Button
$("#cancelOrder").click(function () {
    $("#confirmdeleteOrder").off("click");

    $("#confirmdeleteOrder").click(function () {
        var val = $("#oID").val();

        for (var i in orderDB) {
            if (val === orderDB[i].getoID()) {
                increItemQTY();
                orderDB.splice(i, 1);
                tempItemList = [];
                clearAllordercustTxt();
                clearAllorderitemTxt();
                $("#OtblBody").empty();
                $("#txtCash,#txtBalance,#txtDiscount").val("");
                generateOrderID();
                swal("Success!", "Order has been Canceled!", "success");
                return;
            }
        }
    });


});

//Clear All Button
$("#btnclearAll").click(function () {
    $("#txtSearchOrder").val("");
    $("#txtCash,#txtBalance,#txtDiscount").val("");
    clearAllordercustTxt();
    clearAllorderitemTxt();
    $("#OtblBody").empty();
    generateOrderID();
    decreItemQTY();
    tempItemList = [];
    $("#btnupdateOitem").attr('disabled', true);
    $("#btnPlaceOrder").attr('disabled', true);
    $("#cancelOrder").attr('disabled', true);
    $("#btndeleteoitem").attr('disabled', true);
    $("#btnPlaceOrder").html("Purchase Order");
    $("#btnPlaceOrder").attr("class", "btn btn-success");
    $("#txtSearchOrder").val("");
});

//Place Order Button
$("#btnPlaceOrder").click(function () {

    $("#confirmSaveOrder").off("click");

    $("#confirmSaveOrder").click(function () {
        if (tempItemList.length != 0 && $("#Name").val().length > 0 && $("#txtCash").val().length > 0) {
            placeOrder();
            clearAllorderitemTxt();
            clearAllordercustTxt();
            $("#OtblBody").empty();
            $("#txtCash,#txtBalance,#txtDiscount").val("");
            generateOrderID();
            swal("Success!", "Order has been placed successfully!", "success");
        } else {
            swal("Warning!", "Order cannot be placed please check!", "warning");
        }
    });

});

//Discount Add Button
$("#btnAdd").click(function () {
    if ($("#txtCash").val().length>0 && $.isNumeric($("#txtCash").val())) {
        balanceCal();
    }else {
        swal("Warning!", "Cash cannot be added please check!", "warning");
    }
});

//Item Update button
$("#btnupdateOitem").click(function () {
    if ($("#oqty").val().length > 0) {
        let id = $('#itemID').find(":selected").text();
        let qty = $('#oqty').val();

        if (parseInt($("#oqty").val()) > parseInt($("#qty").val())) {
            swal("Warning!", "There are no enough stock for this order!", "warning");
        } else {
            for (var i in tempItemList) {
                if (id === tempItemList[i].getitemDetailID()) {
                    tempItemList[i].setbuyQTY(qty);
                    var itemPrice = tempItemList[i].getitemPrice();
                    $("#txtTotal,#txtSubTotal").text(updateTotal(itemPrice * qty));
                    loadAllBoughtItems();
                    clearAllorderitemTxt();
                    return;
                }
            }
        }
    } else {
        swal("Warning!", "Item cannot be update please check!", "warning");
    }


});

// search customer button
$("#btnSearchOrder").click(function () {

    var searchID = $("#txtSearchOrder").val();

    var response = searchOrder(searchID);
    if (response) {
        $("#oID").val(searchID);
        $("#date").val(response.getdate());
        $("#CustomerOID").val(response.getCustID());
        console.log("run");
        var customerData = getCustomerData(response.getCustID());
        $("#Name").val(customerData.getCustName());
        console.log(customerData.getCustName());
        $("#Salary").val(customerData.getCustSalary());
        $("#address").val(customerData.getCustAddress());
        tempItemList = response.getitemList();
        $("#txtTotal,#txtSubTotal").text(calculateTotal());
        loadAllBoughtItems();
        increItemQTY();
        $("#btnupdateOitem").attr('disabled', false);
        $("#btnPlaceOrder").attr('disabled', false);
        $("#cancelOrder").attr('disabled', false);
        $("#btnPlaceOrder").html("Update Order");
        $("#btnPlaceOrder").attr("class", "btn btn-outline-warning");

    } else {
        $("#txtSearchOrder").val("");
        swal("Warning!", "Order Not Found!", "warning");
    }
});

/*Add a item*/
function addItem() {
    $("#btnPlaceOrder").attr('disabled', false);
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
                $("#txtTotal,#txtSubTotal").text(updateTotal(itemPrice * oqty));
                return;
            }
        }
    } else {
        //create Object
        /*console.log(true);*/
        var item = new ItemDetail(itemID, itemName, itemPrice, oqty, qty);
        tempItemList.push(item);
        $("#txtTotal,#txtSubTotal").text(updateTotal(itemPrice * oqty));

    }
}

//Place the order
function placeOrder() {
    let oID = $("#oID").val();
    let date = $("#date").val();
    let custID = $('#CustomerOID').find(":selected").text();

    if (isOrderExists(oID)) {
        var b = tempItemList;
        decreItemQTY();
        for (var o of orderDB) {
            if (oID === o.getoID()) {
                o.setitemList(b);
            }
        }
        tempItemList = [];
        $("#txtTotal,#txtSubTotal").text("0Rs/=");
        $("#txtSearchOrder").val("");
        $("#btnPlaceOrder").html("Purchase");
        $("#btnPlaceOrder").attr("class", "btn btn-success");
        $("#btnPlaceOrder").attr('disabled', true);

    } else {
        var a = tempItemList;
        decreItemQTY();
        var order = new Order(oID, custID, date, a);
        orderDB.push(order);
        tempItemList = [];
        $("#txtTotal,#txtSubTotal").text("0Rs/=");
        $("#btnPlaceOrder").attr('disabled', true);
    }


}

//Check whether the order is exists or not
function isOrderExists(id) {
    for (var i of orderDB) {
        if (id === i.getoID()) {
            return true;
        }
    }
    return false;

}

//increment item qty
function increItemQTY() {
    for (var i of tempItemList) {
        for (var j of itemDB) {
            if (j.getitemID() === i.getitemDetailID()) {
                j.setQTY(parseInt(j.getQTY()) + parseInt(i.getbuyQTY()));
            }

        }

    }

}

//increment item qty
function decreItemQTY() {
    for (var i of tempItemList) {
        for (var j of itemDB) {
            if (j.getitemID() === i.getitemDetailID()) {
                j.setQTY(j.getQTY() - i.getbuyQTY());
            }

        }

    }

}

//Calculate balance
function balanceCal() {
    const total = parseInt($("#txtTotal").text().split('R', 1));
    var per = $("#txtDiscount").val();
    var cash = $("#txtCash").val();
    var dis = per / 100;
    $("#txtSubTotal").text((total - (total * dis))+"Rs/=");
    $("#txtBalance").val(cash - (total - (total * dis)));

}

//Check the item is in the item list
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

//Calculate Total
function calculateTotal() {
    var total = 0;
    for (var i of tempItemList) {
        total = total + (i.getitemPrice() * i.getbuyQTY());
    }
    return total + "Rs/=";

}


//Get Customer Data
function getCustomerData(id) {
    for (var i of customerDB) {
        if (id === i.getCustID()) {
            return i;
        }
    }
}

//Serach Order
function searchOrder(id) {
    for (let i = 0; i < orderDB.length; i++) {
        if (orderDB[i].getoID() === id) {
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

        $("#txtTotal,#txtSubTotal").text(updateTotal(-(itemPrice * oqty)));

        // set values for the input fields
        $("#itemID").val(itemID);
        $("#iname").val(itemName);
        $("#qty").val(qty - oqty);
        $("#oqty").val(oqty);
        $("#price").val(price);

        $("#btndeleteoitem").attr('disabled', false);
        $("#btnupdateOitem").attr('disabled', false);

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

/*Clear the text item fields*/
function clearAllorderitemTxt() {
    $('#iname,#price,#oqty,#qty').val("");
    $("#btnAddItem").attr('disabled', true);
    loadAllBoughtItems();
}

//Clear customer txt fields
function clearAllordercustTxt() {
    $('#Name,#Salary,#address').val("");
    $('#date').val("");
    $("#btnAddItem").attr('disabled', true);
    loadAllBoughtItems();
}

//Validation
const orderRegEx = /^[0-9]{1,}$/;

//Validation for item qty
$('#oqty').on('keyup', function () {
    var oqty = $("#oqty").val();
    if (orderRegEx.test(oqty)) {
        $("#oqty").css('border', '2px solid green');
    } else {
        $("#oqty").css('border', '2px solid red');

    }
});

//Validation for cash
$('#txtCash').on('keyup', function () {
    var cash = $("#txtCash").val();
    if (orderRegEx.test(cash)) {
        $("#txtCash").css('border', '2px solid green');
    } else {
        $("#txtCash").css('border', '2px solid red');

    }
});

