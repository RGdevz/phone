import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid';
import type { ContactType, ContactTypeNoID } from './types';
import { myGroups, type MyGroupEnum } from './constants';



const dummyData = [
  { name: 'Alice Johnson', phone: '555-123-4567', id: '1' },
  { name: 'Bob Martinez', phone: '555-987-6543', id: '2' },
  { name: 'Carla Nguyen', phone: '555-246-8101', id: '3' },
  { name: 'David Smith', phone: '555-369-1212', id: '4' },
] as Array<ContactType>;
    


interface StateInfo {
  username:string,
  loggedIn:boolean,
  login:(username:string,password:string)=>void,
  contacts:Array<ContactType>,
  addContact:(user:ContactTypeNoID) =>unknown
  removeContact:(id:string) => unknown
  editContact:(id:string,contact:ContactTypeNoID)=>unknown
  setContacts:(list:Array<ContactType>)=>any

}




export const useGlobalStore = create<StateInfo>((set,get)=>({

  loggedIn:false,

  username:'',


  login:(username:string,password:string)=>set(x=>{

    if (username != 'roei') throw new Error('bad username')
    if (password != '123') throw new Error("bad password")

    return{
      username:username,
      loggedIn:true
    }
  }
),




setContacts:(list)=>set(x=>({contacts:list})),

contacts:[...dummyData.map(x=>({...x,group:[myGroups[Math.floor(Math.random() * 3)]]}))],


addContact:(user:ContactTypeNoID)=> set(x=>{
  
  const c = {...user,id:uuidv4()}
  c.group = c.group || ['No Group']

  return{
   contacts:[...x.contacts,c]
  }
}
),


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

  return ({contacts:x.contacts.toSpliced(index,1)})

}

)

}
))




export function resetContacts(){
  useGlobalStore.getState().setContacts(...[dummyData])
}