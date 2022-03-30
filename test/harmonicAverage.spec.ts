import * as assert from "assert";
import {harmonicAverage} from "../src/harmonicAverage";


// test resources
import outputOne from "./resources/harmonicOutput1.json";
import intermediateOne from "./resources/intermediate1.json";
import outputTwo from "./resources/harmonicOutput2.json";
import intermediateTwo from "./resources/intermediate2.json";
import outputThree from "./resources/harmonicOutput3.json";
import intermediateThree from "./resources/intermediate3.json";

describe("harmonicAverage", function(){
    it("applies a harmonic average for recorded values across the chainages", function() {
        const result = harmonicAverage(intermediateOne);
        assert.deepStrictEqual(result, outputOne);
        const resultTwo = harmonicAverage(intermediateTwo);
        assert.deepStrictEqual(resultTwo, outputTwo);
        const resultThree = harmonicAverage(intermediateThree);
        assert.deepStrictEqual(resultThree, outputThree);
    });
});