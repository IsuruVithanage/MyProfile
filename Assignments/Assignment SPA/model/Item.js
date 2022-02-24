function Item(id, name, qty, price) {
    var __id=id;
    var __name=name;
    var __qty=qty;
    var __price=price;

    this.getitemID = function () {
        return __id;
    }

    this.getitemName = function () {
        return __name;
    }

    this.getQTY = function () {
        return __qty;
    }

    this.getPrice = function () {
        return __price;
    }

    this.setitemID = function (v) {
        __id=v;
    }

    this.setitemName = function (v) {
        __name=v;
    }

    this.setQTY = function (v) {
        __qty=v;
    }

    this.setPrice = function (v) {
        __price=v;
    }


}