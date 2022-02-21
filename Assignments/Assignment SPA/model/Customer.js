function Customer(id, name, address, salary) {
    var __id=id;
    var __name=name;
    var __address=address;
    var __salary=salary;

    this.getCustID = function () {
        return __id;
    }

    this.getCustName = function () {
        return __name;
    }

    this.getCustAddress = function () {
        return __address;
    }

    this.getCustSalary = function () {
        return __salary;
    }

    this.setCustID = function (v) {
        __id=v;
    }

    this.setCustName = function (v) {
        __name=v;
    }

    this.setCustAddress = function (v) {
        __address=v;
    }

    this.setCustSalary = function (v) {
        __salary=v;
    }


}