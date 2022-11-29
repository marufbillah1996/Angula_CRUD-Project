import { SaleDetails } from "./sale-details";

export interface Customer {
    customerID?:number;
    customerName?:string;
    customerPhone?:string;
    saleDetails?:SaleDetails[];
}
