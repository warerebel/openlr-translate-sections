import * as assert from "assert";
import {baselineLength, translate} from "../src/translate";

// test resources
import * as unmatchedUnderLength from "./resources/unmatchedUnderLength.json";
import * as correctedUnderLength from "./resources/correctedUnderLength.json";
import * as unmatchedOverLength from "./resources/unmatchedOverLength.json";
import * as correctedOverLength from "./resources/correctedOverLength.json";

import * as inputModelsSmallerHEDNM from "./resources/input1.json";
import * as intermediateSmallerHEDNM from "./resources/intermediate1.json";
import * as inputModelsEqualHEDNM from "./resources/input2.json";
import * as intermediateEqualHEDNM from "./resources/intermediate2.json";
import * as inputModelLargerHEDNM from "./resources/input3.json";
import * as intermediateLargerHDENM from "./resources/intermediate3.json";

describe("translate module", function () {

    describe("baselineLength", function(){

        it("makes no changes when lengths match", function(){
            const staticResult = baselineLength(inputModelsSmallerHEDNM);
            assert.deepStrictEqual(staticResult, inputModelsSmallerHEDNM);
        });

        it("stretches the longest link of a input group to ensure both groups precisely match the output route length", function(){
            const underResult = baselineLength(unmatchedUnderLength);
            assert.deepStrictEqual(underResult, correctedUnderLength);
        });

        it("shrinks the longest link of a input group to ensure both groups precisely match the output route length", function(){
            const overResult = baselineLength(unmatchedOverLength);
            assert.deepStrictEqual(overResult, correctedOverLength);
        });

    });

    describe("translate", function () {

        it("translates an collection of input link valuess to output link chainages when output links never contain a full input link", function () {
            const result = translate(inputModelsSmallerHEDNM);
            assert.deepStrictEqual(result.toModel, intermediateSmallerHEDNM.toModel);
        });

        it("translates an collection of input link values to output link values when some output links are the same size and location as some input links", function () {
            const result = translate(inputModelsEqualHEDNM);
            assert.deepStrictEqual(result.toModel, intermediateEqualHEDNM.toModel);
        });

        it("translates an collection of input link values to output link values when some output links fully contain some input links", function () {
            const result = translate(inputModelLargerHEDNM);
            assert.deepStrictEqual(result.toModel, intermediateLargerHDENM.toModel);
        });
    });
});
