function ItemDetail(id, name, price , oqty, qty) {
    var __id=id;
    var __name=name;
    var __price=price;
    var __oqty=oqty;
    var __qty=qty;


    this.getitemDetailID = function () {
        return __id;
    }

    this.getitemDetailName = function () {
        return __name;
    }

    this.getbuyQTY = function () {
        return __oqty;
    }

    this.getitemPrice = function () {
        return __price;
    }

    this.getqtyoh = function () {
        return __qty;
    }

    this.setitemID = function (v) {
        __id=v;
    }

    this.setitemDetailName = function (v) {
        __name=v;
    }

    this.setbuyQTY = function (v) {
        __oqty=v;
    }

    this.setQTYoh = function (v) {
        __qty=v;
    }

    this.setitemPrice = function (v) {
        __price=v;
    }


}