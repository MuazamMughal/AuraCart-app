import { Cctv } from "lucide-react";

 export function formatCurrency(
    ammount:number,
    currencyCode : string = "GBP",

 ): string {
    try{
        return new Intl.NumberFormat("en-GB",{
            style:"currency",
            currency:currencyCode.toUpperCase(),

        }).format(ammount)

    }catch(error){
        console.error("Invalid Currency Code" ,currencyCode, error)
    return `${currencyCode.toUpperCase()} ${ammount.toFixed(2)}`
    }

 }