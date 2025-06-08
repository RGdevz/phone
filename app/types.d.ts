
import type { MyGroupEnum } from "./constants"
export interface ContactType{
    name:string,
    phone:string  ,
    id:string
    group?:MyGroupEnum
}


export type ContactTypeNoID = Omit<ContactType,'id'>