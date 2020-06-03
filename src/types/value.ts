// Defines Value Types
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
        if (typeof this == typeof val) {
            return (this as NumV).num === (val as NumV).num
        }
    }
}

// BoolV
class BoolV implements Value {
    bool: boolean

    constructor(bool: boolean) {
        this.bool = bool
    }

    isEqual(val: Value) : boolean {
        if (typeof this == typeof val) {
            return (this as BoolV).bool === (val as BoolV).bool
        }
    }
}

// StrV
class StrV implements Value {
    str: string

    constructor(str: string) {
        this.str = str
    }

    isEqual(val: Value) : boolean {
        if (typeof this == typeof val) {
            return (this as StrV).str === (val as StrV).str
        }
    }
}

// PrimV
class PrimV implements Value {
    prim: (val: Array<Value>) => Value

    constructor(prim: (val: Array<Value>) => Value) {
        this.prim = prim
    }

    isEqual(val: Value) : boolean {
        if (typeof this == typeof val) {
            return (this as PrimV).prim === (val as PrimV).prim
        }
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
        if (typeof this == typeof val) {
            return ((this as CloV).fun === (val as CloV).fun
                && (this as CloV).env === (val as CloV).env)
        }
    }
}