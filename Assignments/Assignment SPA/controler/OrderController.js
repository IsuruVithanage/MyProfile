//Order-------------------------
//Load All Customer ID s in to the ComboBox
function loadAllCustID() {
    $("#CustomerOID").empty();
    for (var i = 0; i <customerDB.length ; i++) {
        $("#CustomerOID").append(new Option(customerDB[i].getCustID()));
    }
}

//Load All Item ID s in to the ComboBox
function loadAllItemID() {
    $("#itemID").empty();
    for (var i = 0; i <itemDB.length ; i++) {
        $("#itemID").append(new Option(itemDB[i].getitemID()));
    }
}


//Add listener to the ComboBox
$("#CustomerOID").click(function () {
    var id = $('#CustomerOID').find(":selected").text();

    for (var i = 0; i < customerDB.length; i++) {
        if (id === customerDB[i].getCustID()){
            $("#Name").val(customerDB[i].getCustName());
            $("#Salary").val(customerDB[i].getCustSalary());
            $("#address").val(customerDB[i].getCustAddress());

        }
    }


});

//Add listener to the Item ComboBox
$("#itemID").click(function () {
    var id = $('#itemID').find(":selected").text();

    for (var i = 0; i < itemDB.length; i++) {
        if (id === itemDB[i].getitemID()){
            $("#iname").val(itemDB[i].getitemName());
            $("#qty").val(itemDB[i].getQTY());
            $("#price").val(itemDB[i].getPrice());

        }
    }


});


//Genereate Customer ID
function generateOrderID() {
    if (orderDB.length !== 0) {
        let id = orderDB[(orderDB.length) - 1].getCustID();
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