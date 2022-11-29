import { SaleDetails } from "../sale-details";

export interface CustomerAndSaleDetailsViewModel {
    bookID?:number,
    customerID?:number;
    customerName?:string;
    customerPhone?:string;
    saleDetails?:SaleDetails[];

}
