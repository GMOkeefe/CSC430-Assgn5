// Unit test code goes here
// <reference path="../types/expression.ts" />
import * as exp from '../types/expression'
import { expect } from 'chai'
import 'mocha'

describe('Expression Equality Function', () => {

    it('should return true', () => {
        const numResult = (new exp.NumC(4)).isEqual(new exp.NumC(4))
        expect(numResult).to.equal(true)

        const strResult = (new exp.StrC("hello")).isEqual(new exp.StrC("hello"))
        expect(strResult).to.equal(true)
    })

})