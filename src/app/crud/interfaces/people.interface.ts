export interface ISale{
        id:number,
        typeDocument:string,
        numberDocument:string,
        nameCustomer: string,
        lastCustomer: string,
        email:string,
        phone:string,
        typeShipping: string,
        operator: string,
        numberPackages:number,
        guide:string,
        salesValue:string,
        methodPayment:string,
        pointSale: string,
        date: string,
        commercialAdvisor: string
}

export interface ITypeDocument{
        value: string,
        label:string
}