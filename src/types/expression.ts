// Defines Expression Types
// ExprC
interface ExprC {}

// NumC
class NumC implements ExprC {
    num: number

    constructor(num: number) {
        this.num = num
    }
}

// IdC
class IdC implements ExprC {
    sym: string

    constructor(sym: string) {
        this.sym = sym
    }
}

// StrC
class StrC implements ExprC {
    str: string

    constructor(str: string) {
        this.str = str
    }
}

// IfC
class IfC implements ExprC {
    cond: ExprC
    ifT: ExprC
    ifF: ExprC

    constructor(cond: ExprC, ifT: ExprC, ifF: ExprC) {
        this.cond = cond
        this.ifT = ifT
        this.ifF = ifF
    }
}

// LamC
class LamC implements ExprC {
    param: Array<string>
    body: ExprC

    constructor(param: Array<string>, body: ExprC) {
        this.param = param
        this.body = body
    }
}

// AppC
class AppC implements ExprC {
    fun: ExprC
    args: Array<ExprC>

    constructor(fun: ExprC, args: Array<ExprC>) {
        this.fun = fun
        this.args = args
    }
}