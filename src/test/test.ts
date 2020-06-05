// Unit test code goes here
// <reference path="../types/expression.ts" />
import * as exp from '../types/expression'
import * as env from '../types/environment'
import * as val from '../types/value'
import { interp, topEnv } from '../services/MainProgram'
import { expect } from 'chai'
import 'mocha'

describe('Expression Equality Function', () => {

    it('should return true', () => {
        const numResult = (new exp.NumC(4)).isEqual(new exp.NumC(4))
        expect(numResult).to.equal(true)

        const strResult = (new exp.StrC("hello")).isEqual(new exp.StrC("hello"))
        expect(strResult).to.equal(true)

        const idResult = (new exp.IdC("abc")).isEqual(new exp.IdC("abc"))
        expect(idResult).to.equal(true)

        const ifResult = (new exp.IfC(
            new exp.NumC(4),
            new exp.NumC(3),
            new exp.NumC(2)))
            .isEqual(new exp.IfC(
                new exp.NumC(4),
                new exp.NumC(3),
                new exp.NumC(2)
            ))
        expect(ifResult).to.equal(true)

        const lamResult = (new exp.LamC(
            [
                "hello",
                "abc",
                "123"
            ],
            new exp.NumC(0)))
            .isEqual(new exp.LamC(
                [
                    "hello",
                    "abc",
                    "123"
                ],
                new exp.NumC(0)
            ))
        expect(lamResult).to.equal(true)

        const appResult = (new exp.AppC(
            new exp.NumC(0),
            [
                new exp.NumC(1),
                new exp.StrC("hello")
            ]))
            .isEqual(new exp.AppC(
                new exp.NumC(0),
                [
                    new exp.NumC(1),
                    new exp.StrC("hello")
                ]))
        expect(appResult).to.equal(true)
    })

})

describe('Value Equality Function', () => {

    it('should return true', () => {
        const numResult = (new val.NumV(4)).isEqual(new val.NumV(4))
        expect(numResult).to.equal(true)

        const strResult = (new val.StrV("hello")).isEqual(new val.StrV("hello"))
        expect(strResult).to.equal(true)

        const boolResult = (new val.BoolV(false)).isEqual(new val.BoolV(false))
        expect(boolResult).to.equal(true)

        var v = (p: Array<val.Value>) => {
            return p[0]
        }

        const primResult = (new val.PrimV(v)).isEqual(new val.PrimV(v))
        expect(primResult).to.equal(true)

        const cloResult = (new val.CloV(
            new exp.LamC(
                [
                    "a"
                ],
                new exp.NumC(4)
            ),
            new env.Env([])
        ))
            .isEqual(new val.CloV(
                new exp.LamC(
                    [
                        "a"
                    ],
                    new exp.NumC(4)
                ),
                new env.Env([])
            ))
        expect(cloResult).to.equal(true)
    })

})

describe('Interpreter Basic', () => {

    it('should return "hello"', () => {
        const out = interp(new exp.StrC("hello"), topEnv)
        expect(out.isEqual(new val.StrV("hello"))).to.equal(true)
    })

})