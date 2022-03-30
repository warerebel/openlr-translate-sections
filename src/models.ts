
export interface modelItem {
    linkid: string,
    length: number
}

export interface toModelItem extends modelItem {
    link: Array<string>,
    endChainage: Array<number>
}


export interface fromModelItem extends modelItem {
    value: number
}

export interface translationInput {
    cost: number,
    openLR: string,
    fromModel: Array<fromModelItem>,
    toModel: Array<toModelItem>
}

export interface translatedModelItem extends modelItem {
    value: number
}

export interface translationOutput {
    cost: number,
    openLR: string,
    items: Array<translatedModelItem>
}