import { Book } from "./book";

export interface SaleDetails {
    bookID?:number;
    quantity?:number;
    book?:Book;
}
