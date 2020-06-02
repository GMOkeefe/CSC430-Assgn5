// Defines Value Types
// Value
interface Value {}

// NumV
class NumV implements Value {
    num: Number

    constructor(num: Number) {
        this.num = num
    }
}

// BoolV
class BoolV implements Value {
    bool: Boolean

    constructor(bool: Boolean) {
        this.bool = bool
    }
}

// StrV
class StrV implements Value {
    str: String

    constructor(str: String) {
        this.str = str
    }
}

// PrimV
class PrimV implements Value {
    prim: Function

    constructor(prim: Function) {
        this.prim = prim
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
}