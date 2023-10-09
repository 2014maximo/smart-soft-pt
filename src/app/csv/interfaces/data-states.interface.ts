export interface IFatalities {
    Province_State: string,
    losses: number,
    citizens:number,
    percent: number
}

export interface IFatalDay {
    Province_State: string,
    country: string,
    diference: number,
    date: string,
}

export interface IDateDiference{
    date: string,
    mayorDiference: number
}