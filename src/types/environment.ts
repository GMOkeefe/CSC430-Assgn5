// Defines Environment
import { Value } from './value'

// Binding
export class Binding {
    name: String
    value: Value

    constructor(name: String, value: Value) {
        this.name = name
        this.value = value
    }

    isEqual(bind: Binding) : boolean {
        if (this === bind) {
            return true
        }
        if (this == null || bind == null) {
            return false
        }
        if (this.name === bind.name && this.value.isEqual(bind.value)) {
            return true
        }
    }
}

// Env
export class Env {
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

    isEqual(env: Env) : boolean{
        if (this === env) {
            return true
        }
        if (this == null || env == null)
        {
            return false
        }
        if (this.bindings.length != env.bindings.length) {
            return false
        }

        for (var i = 0; i < this.bindings.length; i++) {
            if (!this.bindings[i].isEqual(env.bindings[i])) { return false }
        }

        return true
    }
}