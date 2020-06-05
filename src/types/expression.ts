// Defines Expression Types

// array equality helper
function arrayEquals(l: Array<string>, r: Array<string>) : boolean {
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
        if (l[i] != r[i]) { return false }
    }

    return true
}

function expArrayEquals(l: Array<ExprC>, r: Array<ExprC>) : boolean {
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

// ExprC
export interface ExprC {
    isEqual(exp: ExprC) : boolean
}

// NumC
export class NumC implements ExprC {
    num: number

    constructor(num: number) {
        this.num = num
    }

    isEqual(exp: ExprC) : boolean {
        if (typeof this === typeof exp) {
            return (this as NumC).num === (exp as NumC).num
        }
        return false
    }
}

// IdC
export class IdC implements ExprC {
    sym: string

    constructor(sym: string) {
        this.sym = sym
    }

    isEqual(exp: ExprC) : boolean {
        if (typeof this === typeof exp) {
            return (this as IdC).sym === (exp as IdC).sym
        }
        return false
    }
}

// StrC
export class StrC implements ExprC {
    str: string

    constructor(str: string) {
        this.str = str
    }

    isEqual(exp: ExprC) : boolean {
        if (typeof this == typeof exp) {
            return (this as StrC).str === (exp as StrC).str
        }
        return false
    }
}

// IfC
export class IfC implements ExprC {
    cond: ExprC
    ifT: ExprC
    ifF: ExprC

    constructor(cond: ExprC, ifT: ExprC, ifF: ExprC) {
        this.cond = cond
        this.ifT = ifT
        this.ifF = ifF
    }

    isEqual(exp: ExprC) : boolean {
        if (typeof this === typeof exp) {
            return (this as IfC).cond.isEqual((exp as IfC).cond) &&
                (this as IfC).ifT.isEqual((exp as IfC).ifT) &&
                (this as IfC).ifF.isEqual((exp as IfC).ifF)
        }
        return false
    }
}

// LamC
export class LamC implements ExprC {
    param: Array<string>
    body: ExprC

    constructor(param: Array<string>, body: ExprC) {
        this.param = param
        this.body = body
    }

    isEqual(exp: ExprC) : boolean {
        if (typeof this === typeof exp) {
            return arrayEquals((this as LamC).param, (exp as LamC).param) &&
                (this as LamC).body.isEqual((exp as LamC).body)
        }
        return false
    }
}

// AppC
export class AppC implements ExprC {
    fun: ExprC
    args: Array<ExprC>

    constructor(fun: ExprC, args: Array<ExprC>) {
        this.fun = fun
        this.args = args
    }

    isEqual(exp: ExprC) : boolean {
        if (typeof this === typeof exp) {
            return (this as AppC).fun.isEqual((exp as AppC).fun) &&
                expArrayEquals((this as AppC).args, (exp as AppC).args)
        }
        return false
    }
}