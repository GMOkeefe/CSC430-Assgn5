import * as deepEqual from "deep-equal"

var addOp = function (args: Array<Value>) : Value {
    if (args.length != 2) {
        throw new Error("'addOp: AQSE incorrect number of args");
    }
    if (args[0] instanceof NumV && args[1] instanceof NumV) {
        return (new NumV((args[0] as NumV).num + (args[1] as NumV).num));
    }
    else {
        throw new Error("'addOp: AQSE both arguments must be numbers");
    }
}

var subOp = function (args: Array<Value>) : Value {
    if (args.length != 2) {
        throw new Error("'subOp: AQSE incorrect number of args");
    }
    if (args[0] instanceof NumV && args[1] instanceof NumV) {
        return (new NumV((args[0] as NumV).num - (args[1] as NumV).num));
    }
    else {
        throw new Error("'subOp: AQSE both arguments must be numbers");
    }
}

var multOp = function (args: Array<Value>) : Value {
    if (args.length != 2) {
        throw new Error("'multOp: AQSE incorrect number of args");
    }
    if (args[0] instanceof NumV && args[1] instanceof NumV) {
        return (new NumV((args[0] as NumV).num * (args[1] as NumV).num));
    }
    else {
        throw new Error("'multOp: AQSE both arguments must be numbers");
    }
}

var divOp = function (args: Array<Value>) : Value {
    if (args.length != 2) {
        throw new Error("'divOp: AQSE incorrect number of args");
    }
    if (args[0] instanceof NumV && args[1] instanceof NumV) {
        return (new NumV((args[0] as NumV).num / (args[1] as NumV).num));
    }
    else {
        throw new Error("'divOp: AQSE both arguments must be numbers");
    }
}

var leqOp = function (args: Array<Value>) : Value {
    if (args.length != 2) {
        throw new Error("'leqOp: AQSE incorrect number of args");
    }
    if (args[0] instanceof NumV && args[1] instanceof NumV) {
        return (new BoolV((args[0] as NumV).num <= (args[1] as NumV).num));
    }
    else {
        throw new Error("'leqOp: AQSE both arguments must be numbers");
    }
}

var equalOp = function (args: Array<Value>) : Value {
    if (args.length != 2) {
        throw new Error("'equalOp: AQSE incorrect number of args");
    }
    if (typeof args[0] === typeof args[1]) {
        return (new BoolV(deepEqual(args[0], args[1])));
    }
    else {
        throw new Error("'equalOp: AQSE both arguments must be numbers");
    }
}

var errorOp = function (args: Array<Value>) : Value {
    if (args.length === 1) {
        throw new Error("'errorOp: " + args[0].serialize());
    }
    else {
        throw new Error("'errorOp: AQSE incorrect number of args");
    }
}