import { GenderType } from "../constants";

export interface AuthorViewModel {
    authorID?:number;
    authorName?:string;
    authorAddress?:string;
    gender?:GenderType;
    canDelete?:boolean
}
