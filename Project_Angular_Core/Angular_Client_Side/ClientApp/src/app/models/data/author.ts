import {GenderType} from "./constants";

export interface Author {
    authorID?:number;
    authorName?:string;
    authorAddress?:string;
    gender?:GenderType;
}