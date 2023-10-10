export const EXC_DATES = [
    "UID",
    "iso2",
    "iso3",
    "code3",
    "IPS",
    "Admin2",
    "Province_State",
    "Country_Region",
    "Lat",
    "Long_",
    "Combined_Key",
    "Population",
    "FIPS"
]

export const QUEST = {
    mayorAcumulado:(h:number,b:number) => {
        return [`Habitantes ${h}`,`Bajas ${b}`]
    },
    menorAcumulado:(h:number,b:number) => {
        return [`Habitantes ${h}`,`Bajas ${b}`]
    }
}

export const RESP_QUEST = {
    mayor:(e:string, d:number) => {
        return `El estado de ${e} con ${d}, el mayor número de bajas humanas en total.`
    },
    minor:(e:string, d:number) => {
        return `El estado de ${e} con ${d}, el menor número de bajas humanas en total.`
    },
    afected:(date:string, increment:number, state:string) => {
        return `Con el mayor incremento repentino de ${increment} bajas, en la fecha ${date}, ${state}, representa el estado más afectado por lo complicado de atender por completo a todos los pacientes, lo que les genera más pérdidas en esperas.`
    }

}