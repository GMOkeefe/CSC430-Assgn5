import * as deepEqual from "deep-equal"


// All Prim-op Function Definitions for Top-env ================================

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

// Top-env definition ==========================================================
var topEnv = new Env([
    new Binding('+', new PrimV(addOp)),
    new Binding('-', new PrimV(subOp)),
    new Binding('*', new PrimV(multOp)),
    new Binding('/', new PrimV(divOp)),
    new Binding('<=', new PrimV(leqOp)),
    new Binding('equal?', new PrimV(equalOp)),
    new Binding('error', new PrimV(errorOp)),
    new Binding('true', new BoolV(true)),
    new Binding('false', new BoolV(false))
]);

//parse

//parse-related code

// Interp definition ===========================================================
var interp = function(expr : ExprC, env : Env) : Value {
    if (expr instanceof NumC) {
        return new NumV(expr.num);
    }
    else if (expr instanceof StrC) {
        return new StrV(expr.str);
    }
    else if (expr instanceof IdC) {
        return env.lookup(expr.sym);
    }
    else if (expr instanceof IfC) {
        var condVal = interp(expr.cond, env);
        if (condVal.isEqual(new BoolV(true))) {
            return interp(expr.ifT, env);
        }
        else if (condVal.isEqual(new BoolV(false))) {
            return interp(expr.ifF, env);
        }
        else {
            throw new Error("'interp AQSE type error: statement not boolean");
        }
    }
    else if (expr instanceof LamC) {
        new CloV(expr, env);
    }
    else if (expr instanceof AppC) {
        var funVal = interp(expr.fun, env);
        var argVals = expr.args.map( (val) => {
            return interp(val, env);
        });

        if (funVal instanceof PrimV) {
            return funVal.prim(argVals);
        }
        else if (funVal instanceof CloV) {
            var lam = funVal.fun;
            return interp(lam.body, env.extend(lam.param, argVals));
        }
        else {
            throw new Error("'interp AQSE type error: not callable");
        }
    }  
}

//top-interp
