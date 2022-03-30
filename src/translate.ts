import {reduceLength} from "./validate";
import {translationInput} from "../src/models";

export function baselineLength(links: translationInput): translationInput{
    const totalOutputLength = links.toModel.reduce(reduceLength, 0);
    const totalInputLength = links.fromModel.reduce(reduceLength, 0);
    const difference = totalOutputLength - totalInputLength;
    if(Math.abs(difference) > 0){
        const longestLink = links.fromModel.reduce((prev, currentValue, currentIndex)=> prev.length > currentValue.length ? prev : {length: currentValue.length, index: currentIndex},{length: 0, index: 0});
        links.fromModel[longestLink.index].length += difference;
    }
    return links;
}

export function translate(links: translationInput): translationInput{
    let currentOutputLocation = 0;
    let currentOutputLink = 0;
    let currentOutputLinkLocation = 0;
    let currentInputLinkLocation = 0;
    let currentInputLink = 0;
    const totalOutputLength = links.toModel.reduce(reduceLength, 0);
    while(currentOutputLocation < totalOutputLength){
        if(links.toModel[currentOutputLink].length - currentOutputLinkLocation <= links.fromModel[currentInputLink].length - currentInputLinkLocation){
            links.toModel[currentOutputLink].endChainage.push(links.toModel[currentOutputLink].length);
            links.toModel[currentOutputLink].link.push(links.fromModel[currentInputLink].linkid);
            currentInputLinkLocation += links.toModel[currentOutputLink].length - currentOutputLinkLocation;
            currentOutputLocation += links.toModel[currentOutputLink].length - currentOutputLinkLocation;
            currentOutputLinkLocation = 0;
            currentOutputLink++;
            if(links.fromModel[currentInputLink].length === currentInputLinkLocation){
                currentInputLink++;
                currentInputLinkLocation = 0;
            }
        } else {
            links.toModel[currentOutputLink].endChainage.push(links.fromModel[currentInputLink].length - currentInputLinkLocation + currentOutputLinkLocation);
            links.toModel[currentOutputLink].link.push(links.fromModel[currentInputLink].linkid);
            currentOutputLocation += links.fromModel[currentInputLink].length - currentInputLinkLocation;
            currentOutputLinkLocation += links.fromModel[currentInputLink].length - currentInputLinkLocation;
            currentInputLinkLocation = 0;
            currentInputLink++;
        }
    }
    return links;
}
