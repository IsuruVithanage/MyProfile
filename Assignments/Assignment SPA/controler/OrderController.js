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

$("#btnAddItem").click(function () {
    addItem();
    loadAllBoughtItems();

});

/*Add a item*/
function addItem() {
    //gather Item information
    let itemID = $('#itemID').find(":selected").text();
    let itemName = $("#iname").val();
    let itemPrice = $("#price").val();
    let oID = $("#oID").val();
    let date = $("#date").val();
    let custID = $('#CustomerOID').find(":selected").text();
    let oqty = $("#oqty").val();
    let qty = $("#qtyonH").val();

    if (isExistsItemDetail(itemID)) {
        for (var i of tempItemList) {
            if (itemID === i.getitemDetailID()) {
                i.setbuyQTY(parseInt(i.getbuyQTY())+parseInt(oqty));
                return;
            }
        }
    }else {
        //create Object
        /*console.log(true);*/
        var item=new ItemDetail(itemID,itemName,itemPrice,oqty,qty);
        tempItemList.push(item);
    }



    /*var orderObject = new Order(customerID, customerName, customerAddress, customerSalary);
    orderDB.push(orderObject);*/
}


//Check the
function isExistsItemDetail(id) {
    for (var i of tempItemList){
        if (id===i.getitemDetailID()){
            return true;
        }
    }
    return false;

}



/*Display customer in the Table*/
function loadAllBoughtItems() {
    $("#OtblBody>tr").off("click");

    $("#OtblBody").empty();
    for (var i of tempItemList) {
        /*create a html row*/
        var itemPrice = i.getitemPrice();
        var buyQTY = i.getbuyQTY();

        let row = `<tr><td>${i.getitemDetailID()}</td><td>${i.getitemDetailName()}</td><td>${itemPrice}</td><td>${buyQTY}</td><td>${buyQTY*itemPrice}</td></tr>`;
        /*select the table body and append the row */
        $("#OtblBody").append(row);
    }

    //bind the events to the table rows after the row was added
    $("#OtblBody>tr").click(function () {
        let itemID= $(this).children(":eq(0)").text();
        let itemName = $(this).children(":eq(1)").text();
        let price = $(this).children(":eq(2)").text();
        let qty = $(this).children(":eq(3)").text();
        let total = $(this).children(":eq(4)").text();

        // set values for the input fields
        $("#itemID").val(itemID);
        $("#iname").val(itemName);
        $("#qty").val(qty);
        $("#oqty").val(qty);
        $("#price").val(price);


    });
}