
import type { MyGroupEnum } from "./constants"
export interface ContactType{
    name:string,
    phone:string  ,
    id:string
    group?:MyGroupEnum
    isFavorite?:boolean
}


export type ContactTypeNoID = Omit<ContactType,'id'>