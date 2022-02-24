//Customer----------------------------------------
// Save Customer Button
$("#btnSaveCust").click(function () {

    // remove all the row click events added before
    $("#custTable>tr").off("click");

    $("#confirmSaveCust").off("click");

    $("#confirmSaveCust").click(function () {
        saveCustomer();
        clearAllCustTxt();
        loadAllCustomers();
        generateCustID();
    });
});

// Clear Customer Button
$("#btnClearCust").click(function () {
    clearAllCustTxt();
    generateCustID();

});

//Set Delete button
$("#btnDeleteCust").click(function () {
    $("#confirmdeleteCust").off("click");

    $("#confirmdeleteCust").click(function () {
        deleteCustomer($("#txtCustID").text());
        clearAllCustTxt();
        loadAllCustomers();
        generateCustID();

    });


});

/*Clear the text fields*/
function clearAllCustTxt() {
    $('#txtCustName,#txtCustAddress,#txtCustSalary').val("");
    $('#txtCustName,#txtCustAddress,#txtCustSalary').css('border', '2px solid #ced4da');
    $('#txtCustName').focus();
    $("#btnSaveCust").attr('disabled', true);
    loadAllCustomers();
    $("#lblcusid,#lblcusname,#lblcusaddress,#lblcussalary").text("");
    $("#btnSaveCust").html("Save Customer");
    $("#btnSaveCust").attr("class","btn btn-outline-primary");
}

/*Save Customer*/
function saveCustomer() {
    //gather customer information
    let customerID = $("#txtCustID").text();
    let customerName = $("#txtCustName").val();
    let customerAddress = $("#txtCustAddress").val();
    let customerSalary = $("#txtCustSalary").val();

    if (isExists(customerID)){
        for (var i of customerDB) {
            if (customerID===i.getCustID()){
                i.setCustName(customerName);
                i.setCustAddress(customerAddress);
                i.setCustSalary(customerSalary);
                return;
            }
        }

    }else {
        //create Object
        /*console.log(true);*/
        var customerObject = new Customer(customerID, customerName, customerAddress, customerSalary);
        customerDB.push(customerObject);
    }
}

//Check the
function isExists(id) {
    for (var i of customerDB){
        if (id===i.getCustID()){
            return true;
        }
    }
    return false;

}

/*Delete Customer*/
function deleteCustomer(id) {
    for (var i in customerDB){
        if (id===customerDB[i].getCustID()){
            customerDB.splice(i,1);
            return;
        }
    }

}

/*Display customer in the Table*/
function loadAllCustomers() {
    $("#custTableBody").empty();
    for (var i of customerDB) {
        /*create a html row*/
        let row = `<tr><td>${i.getCustID()}</td><td>${i.getCustName()}</td><td>${i.getCustAddress()}</td><td>${i.getCustSalary()}</td></tr>`;
        /*select the table body and append the row */
        $("#custTableBody").append(row);
    }

    //bind the events to the table rows after the row was added
    $("#custTableBody>tr").click(function () {
        let cusID= $(this).children(":eq(0)").text();
        let cusName = $(this).children(":eq(1)").text();
        let cusAddress = $(this).children(":eq(2)").text();
        let cusTP = $(this).children(":eq(3)").text();

        // set values for the input fields
        $("#txtCustID").text(cusID);
        $("#txtCustName").val(cusName);
        $("#txtCustAddress").val(cusAddress);
        $("#txtCustSalary").val(cusTP);

        $("#btnSaveCust").html("Update Customer");
        $("#btnSaveCust").attr("class","btn btn-outline-warning");

    });
}

// search customer
$("#btnSearchCust").click(function () {
    var searchID = $("#txtSearchCust").val();

    var response = searchCustomer(searchID);
    if (response) {
        $("#txtCustID").text(response.id);
        $("#txtCustName").val(response.name);
        $("#txtCustAddress").val(response.address);
        $("#txtCustSalary").val(response.salary);
    } else {
        clearAllCustTxt();
        alert("No Such a Customer");
    }
});

//Serach Customer
function searchCustomer(id) {
    for (let i = 0; i < customerDB.length; i++) {
        if (customerDB[i].id == id) {
            return customerDB[i];
        }
    }
}

//Genereate Customer ID
function generateCustID() {
    if (customerDB.length !== 0) {
        let id = customerDB[(customerDB.length) - 1].getCustID();
        const txt = id.split('C', 2);
        let newcustID = parseInt(txt[1]) + 1;
        console.log(newcustID);

        if (newcustID <= 9) {
            $("#txtCustID").text("C00" + newcustID);
        } else if (newcustID <= 99) {
            $("#txtCustID").text("C0" + newcustID);
        } else if (newcustID <= 999) {
            $("#txtCustID").text("C" + newcustID);
        }

    } else {
        $("#txtCustID").text("C001");
    }

}

//Customer validation started
// customer regular expressions
const cusNameRegEx = /^[A-z ]{5,20}$/;
const cusAddressRegEx = /^[A-z]{7,}$/;
const cusSalaryRegEx = /^[0-9]{1,}$/;


$('#txtCustName,#txtCustAddress,#txtCustSalary').on('keydown', function (eventOb) {
    if (eventOb.key == "Tab") {
        eventOb.preventDefault(); // stop execution of the button
    }
});

$('#txtCustName,#txtCustAddress,#txtCustSalary').on('blur', function () {
    formCustValid();
});

//focusing events
$("#txtCustName").on('keyup', function (eventOb) {
    setCustButton();
    if (eventOb.key == "Enter") {
        checkIfCustValid();
    }

    if (eventOb.key == "Control") {
        var typedCustomerID = $("#txtCustID").text();
        var srcCustomer = searchCustomerFromID(typedCustomerID);
        $("#txtCustID").text(srcCustomer.getCustomerID());
        $("#txtCustName").val(srcCustomer.getCustomerName());
        $("#txtCustAddress").val(srcCustomer.getCustomerAddress());
        $("#txtCustSalary").val(srcCustomer.getCustomerSalary());
    }

});


$("#txtCustAddress").on('keyup', function (eventOb) {
    setCustButton();
    if (eventOb.key == "Enter") {
        checkIfCustValid();
    }
});

$("#txtCustSalary").on('keyup', function (eventOb) {
    setCustButton();
    if (eventOb.key == "Enter") {
        checkIfCustValid();
    }
});
// focusing events end
$("#btnSaveCust").attr('disabled', true);


function formCustValid() {
    var cusName = $("#txtCustName").val();
    if (cusNameRegEx.test(cusName)) {
        $("#txtCustName").css('border', '2px solid green');
        $("#lblcusname").text("");
        var cusAddress = $("#txtCustAddress").val();
        if (cusAddressRegEx.test(cusAddress)) {
            var cusSalary = $("#txtCustSalary").val();
            var resp = cusSalaryRegEx.test(cusSalary);
            $("#txtCustAddress").css('border', '2px solid green');
            $("#lblcusaddress").text("");
            if (resp) {
                $("#txtCustSalary").css('border', '2px solid green');
                $("#lblcussalary").text("");
                return true;
            } else {
                $("#txtCustSalary").css('border', '2px solid red');
                $("#lblcussalary").text("Cus Salary is a required field : Pattern 100.00 or 100");
                return false;
            }
        } else {
            $("#txtCustAddress").css('border', '2px solid red');
            $("#lblcusaddress").text("Cus Address is a required field : Mimum 7");
            return false;
        }
    } else {
        $("#txtCustName").css('border', '2px solid red');
        $("#lblcusname").text("Cus Name is a required field : Mimimum 5, Max 20, Spaces Allowed");
        return false;
    }
}

function checkIfCustValid() {
    var cusName = $("#txtCustName").val();
    if (cusNameRegEx.test(cusName)) {
        $("#txtCustAddress").focus();
        var cusAddress = $("#txtCustAddress").val();
        if (cusAddressRegEx.test(cusAddress)) {
            $("#txtCustSalary").focus();
            var cusSalary = $("#txtCustSalary").val();
            var resp = cusSalaryRegEx.test(cusSalary);
            if (resp) {

            } else {
                $("#txtCustSalary").focus();
            }
        } else {
            $("#txtCustAddress").focus();
        }
    } else {
        $("#txtCustName").focus();
    }
}

function setCustButton() {
    let b = formCustValid();
    if (b) {
        $("#btnSaveCust").attr('disabled', false);
    } else {
        $("#btnSaveCust").attr('disabled', true);
    }
}

$('#btnSaveCust').click(function () {
    checkIfCustValid();
});
//validation ended