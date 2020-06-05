// Defines Value Types
import { ExprC, NumC, StrC, IdC, IfC, LamC, AppC } from './expression'
import { Env } from './environment'

// array equality helper
function valArrayEquals(l: Array<Value>, r: Array<Value>) : boolean {
    if (l === r) {
        return true
    }
    if (l == null || r == null) {
        return false
    }
    if (l.length != r.length) {
        return false
    }

    for (var i = 0; i < l.length; i++) {
        if (!(l[i].isEqual(r[i]))) { return false }
    }

    return true
}

// Value
export interface Value {
    isEqual(val: Value) : boolean
    serialize() : string
}

// NumV
export class NumV implements Value {
    num: number

    constructor(num: number) {
        this.num = num
    }

    isEqual(val: Value) : boolean {
        if (typeof this === typeof val) {
            return (this as NumV).num === (val as NumV).num
        }
        return false
    }

    serialize() : string {
        return this.num.toString();
    }
}

// BoolV
export class BoolV implements Value {
    bool: boolean

    constructor(bool: boolean) {
        this.bool = bool
    }

    isEqual(val: Value) : boolean {
        if (typeof this === typeof val) {
            return (this as BoolV).bool === (val as BoolV).bool
        }
        return false
    }

    serialize() : string {
        if (this.bool === true) {
            return "true"
        }
        else {
            return "false"
        }
    }
}

// StrV
export class StrV implements Value {
    str: string

    constructor(str: string) {
        this.str = str
    }

    isEqual(val: Value) : boolean {
        if (typeof this === typeof val) {
            return (this as StrV).str === (val as StrV).str
        }
        return false
    }

    serialize() : string {
        return this.str;
    }
}

// PrimV
export class PrimV implements Value {
    prim: (val: Array<Value>) => Value

    constructor(prim: (val: Array<Value>) => Value) {
        this.prim = prim
    }

    isEqual(val: Value) : boolean {
        if (typeof this === typeof val) {
            return (this as PrimV).prim === (val as PrimV).prim
        }
        return false
    }

    serialize() : string {
        return "#<primop>";
    }
}

// CloV
export class CloV implements Value {
    fun: LamC
    env: Env

    constructor(fun: LamC, env: Env) {
        this.fun = fun
        this.env = env
    }

    isEqual(val: Value) : boolean {
        if (typeof this === typeof val) {
            return ((this as CloV).fun.isEqual((val as CloV).fun) &&
                (this as CloV).env.isEqual((val as CloV).env))
        }
        return false
    }

    serialize() : string {
        return "#<procedure>";
    }
}