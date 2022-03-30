import { translationInput, translationOutput} from "./models";

export function harmonicAverage(input: translationInput): translationOutput{
    const lookup = buildLookup(input);
    const output: translationOutput = {items: [], cost: input.cost, openLR: input.openLR};
    for(const link of input.toModel){
        const preTopLine = link.endChainage.map((element, index, array) => {
            return index > 0 ? (element - array[index -1]) * Math.pow(lookup.get(link.link[index]), -1) : element * Math.pow(lookup.get(link.link[index]), -1);
        });
        const topLine = preTopLine.reduce((prev, cur) => {return prev + cur;} );
        const average = parseFloat(Math.pow((topLine / link.length), -1).toFixed(1));
        output.items.push({linkid: link.linkid, length: link.length, value: average});
    }
    return output;
}

function buildLookup(input: translationInput){
    const lookup = new Map();
    for(const item of input.fromModel){
        lookup.set(item.linkid, item.value);
    }
    return lookup;
}
