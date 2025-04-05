import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid';


const dummyData = [
  { name: 'Alice Johnson', phone: '555-123-4567', id: '1' },
  { name: 'Bob Martinez', phone: '555-987-6543', id: '2' },
  { name: 'Carla Nguyen', phone: '555-246-8101', id: '3' },
  { name: 'David Smith', phone: '555-369-1212', id: '4' },
] as Array<ContactType>;
    


interface StateInfo {
  contacts:Array<{name:string,phone:string,id:string}>,
  addContact:(name:string,phone:string) =>unknown
  removeContact:(id:string) => unknown
  editContact:(id:string,contact:Omit<ContactType,'id'>)=>unknown
  setContacts:(list:Array<ContactType>)=>any

}

export const useGlobalStore = create<StateInfo>((set,get)=>({




setContacts:(list)=>set(x=>({contacts:list})),

contacts:[...dummyData],

addContact:(name:string,phone:string)=> set(x=>({contacts: [...x.contacts,{name,phone,id:uuidv4()}]})),

editContact:(id,contact) => set(x=>{

 const index = x.contacts.findIndex(x=>x.id == id)
 if (index == -1) return ({})
 const copy = [...x.contacts]
copy[index] =  {...contact,id}

return ({contacts:copy})

}
),



removeContact:(id:string) => set(x=> {

   const index = x.contacts.findIndex(x=>x.id == id)

   if (index == -1) return ({})

//@ts-ignore
  return ({contacts:x.contacts.toSpliced(index,1)})

}

)

}
))




export function resetContacts(){
  useGlobalStore.getState().setContacts(...[dummyData])
}