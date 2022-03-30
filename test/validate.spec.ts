import * as assert from "assert";
import {translationInput} from "../src/models";
import {validateInput, checkLength, checkInputModelArrays} from "../src/validate";

// test resource files
import * as validationOne from "./resources/validation1.json";
import * as validationTwo from "./resources/validation2.json";
import * as validationThree from "./resources/validation3.json";
import * as validationFour from "./resources/validation4.json";
import * as validationFive from "./resources/validation5.json";

describe("validate", function () {

    it("Confirms that the combined lengths of input links of both models are within tolerance", function () {
        try{
            checkLength(validationOne, 5);
        } catch(error){
            assert.ok(false);
        }
    });

    it("Fails when the combined lengths of input links of both models are outside of tolerance", function () {
        try{
            checkLength(validationTwo, 5);
            assert.ok(false);
        } catch(error: unknown){
            if(error instanceof Error)
                assert.deepStrictEqual(error.message, "The toModel length varies outside of tolerance from the fromModel length");
            else
                assert.ok(false);
        }
    });

    it("validates an input model is well formed", function(){
        try{
            validateInput(validationOne, 5);
        }
        catch(error){
            assert.ok(false);
        }       
    });

    it("identifies a malformed input document", function(){
        try{
            validateInput(validationThree as translationInput, 5);
            assert.ok(false);
        }
        catch(error){
            if(error instanceof Error)
                assert.deepStrictEqual(error.message, "toModel.1.length");
        }    
    });

    it("validates that endChainage and link arrays are equivalent sizes and do not exceed fromModel array size", function(){
        try{
            checkInputModelArrays(validationOne);
        } catch(error){
            assert.ok(false);
        }
    });

    it("identifies that endChainage and link arrays are not equal size", function(){
        try{
            checkInputModelArrays(validationFour);
            assert.ok(false);
        } catch(error: unknown){
            if(error instanceof Error)
                assert.deepStrictEqual(error.message, "endChainage and link array lengths do not match");
            else
                assert.ok(false);
        }
    });

    it("identifies link array exceeds fromModel array size", function(){
        try{
            checkInputModelArrays(validationFive);
            assert.ok(false);
        } catch(error: unknown){
            if(error instanceof Error)
                assert.deepStrictEqual(error.message, "Input model link array exceeds fromModel array size");
            else
                assert.ok(false);
        }
    });
});