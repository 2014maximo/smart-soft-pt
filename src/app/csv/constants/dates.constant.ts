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