export class Record {
    datasetid!: string;
    fields!: Field;
    record_timestamp!: string;
    recordid!: string;
}

class Field {
    alpha!: number;
    datetime!: string;
    marginaldecrementalprice!: number;
    marginalincrementalprice!: number;
    negativeimbalanceprice!: number;
    netregulationvolume!: number;
    positiveimbalanceprice!: number;
    qualitystatus!: string;
    resolutioncode!: string;
    systemimbalance!: number
}