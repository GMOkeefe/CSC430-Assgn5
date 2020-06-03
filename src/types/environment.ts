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

    //extend/add to the environment
    extend (params: Array<String>, args: Array<Value>) : Env {
        var bindingsList = [];
        var i = 0;

        if (params.length != args.length) {
            throw new Error('AQSE parameters and arguments sizes differ');
        }
        
        for (i = 0; i < params.length; i++) {
            bindingsList.push(new Binding(params[i], args[i]));
        }

        return new Env(bindingsList.concat(this.bindings));
    }


    //lookup entities in the environment
    lookup (sym: String) : Value {
        var i = 0;
        var result;

        for (i = 0; i < this.bindings.length; i++) {
            if (sym === this.bindings[i].name) {
                result = this.bindings[i].value
                break;
            }
        }
        if (result === undefined) {
            throw new Error('AQSE sym not in env');
        }
        else {
            return result;
        }
    }
}