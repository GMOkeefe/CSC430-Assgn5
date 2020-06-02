// Defines Environment
// Binding
class Binding {
    name: String
    value: Value

    constructor(name: String, value: Value) {
        this.name = name
        this.value = value
    }
}

// Env
class Env {
    bindings: Array<Binding>

    constructor(bindings: Array<Binding>) {
        this.bindings = bindings
    }
}