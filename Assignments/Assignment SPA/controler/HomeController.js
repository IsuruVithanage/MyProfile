function loadHomeData() {
    var cust = customerDB.length;
    var item = itemDB.length;
    var order = orderDB.length;

    if (cust<10){
        cust="0"+cust;
    }
    if (item<10){
        item="0"+item;
    }
    if (order<10){
        order="0"+order;
    }

    $("#totCust").text(cust);
    $("#totItem").text(item);
    $("#totOrder").text(order);

}