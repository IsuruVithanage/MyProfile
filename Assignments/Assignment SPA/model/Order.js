function Order(oID, custID, date, itemList) {
    var __oID = oID;

    var __custID = custID;

    var __date = date;

    var __itemList = itemList;

    this.getoID = function () {
        return __oID;
    }

    this.getCustID = function () {
        return __custID;
    }

    this.getdate = function () {
        return __date;
    }

    this.getitemList = function () {
        return __itemList;
    }

    this.setoID = function (v) {
        __oID = v;
    }

    this.setCustID = function (v) {
        __custID = v;
    }

    this.setdate = function (v) {
        __date = v;
    }

    this.setitemList = function (v) {
        __itemList = v;
    }


}