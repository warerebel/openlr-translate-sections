import Schema from "validate";
import { ValidationError } from "validate";
import { modelItem, translationInput } from "./models";

export function validateInput(input: translationInput, tolerance: number): void{
    const validationResult = validate(input);
    if(validationResult.length === 0){
        checkInputModelArrays(input);
        checkLength(input, tolerance);
    } else {
        throw new Error(validationResult[0].path);
    }
}

export function validate(input: translationInput): ValidationError[]{
    return translateInput.validate(input);
}

export function checkInputModelArrays(input: translationInput): void{
    for(let toModelItem in input.toModel){
        const chainageLinkResult = input.toModel[toModelItem].endChainage.length === input.toModel[toModelItem].link.length;
        const linkResult = input.toModel[toModelItem].link.length <= input.fromModel.length;
        if(!chainageLinkResult)
            throw new Error("endChainage and link array lengths do not match");
        if(!linkResult)
            throw new Error("Input model link array exceeds fromModel array size");
    }
}

export function checkLength(input: translationInput, tolerance: number): void {
    const fromLinks = input.fromModel.reduce(reduceLength, 0);
    const toLinks = input.toModel.reduce(reduceLength, 0);
    const diff = (Math.abs(fromLinks - toLinks) / fromLinks) * 100;
    if(diff > tolerance)
        throw new Error("The toModel length varies outside of tolerance from the fromModel length");
}

export function reduceLength(total: number, next: modelItem): number{
    return total + next.length;
}

const translateInput = new Schema({
    cost: {
        type: Number,
        required: true
    },
    openLR: {
        type: String,
        required: true
    },
    fromModel: {
        type: Array,
        required: true,
        each: {
            linkid: {
                type: String,
                required: true
            },
            length: {
                type: Number,
                required: true
            },
            value: {
                type: Number,
                required: true
            }
        }
    },
    toModel: {
        type: Array,
        required: true,
        each: {
            linkid: {
                type: String,
                required: true
            },
            length: {
                type: Number,
                required: true
            },
            link: {
                type: Array,
                each: {type: String},
                required: true
            },
            endChainage: {
                type: Array,
                each: {type: Number},
                required: true
            }
        }
    }
});
