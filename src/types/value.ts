// Defines Value Types

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
interface Value {
    isEqual(val: Value) : boolean
}

// NumV
class NumV implements Value {
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
}

// BoolV
class BoolV implements Value {
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
}

// StrV
class StrV implements Value {
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
}

// PrimV
class PrimV implements Value {
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
}

// CloV
class CloV implements Value {
    fun: LamC
    env: Env

    constructor(fun: LamC, env: Env) {
        this.fun = fun
        this.env = env
    }

    isEqual(val: Value) : boolean {
        if (typeof this === typeof val) {
            return ((this as CloV).fun.isEqual((val as CloV).fun) &&
                (this as CloV).env === (val as CloV).env)
        }
        return false
    }
}