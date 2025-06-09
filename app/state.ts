import { create } from 'zustand'
import {  persist } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid';
import type { ContactType, ContactTypeNoID } from './types';
import { myGroups, type MyGroupEnum } from './constants';


const users = [

  {user:'roei',password:'123',role:'admin'},
  {user:'user',password:'123',role:'user'},
] satisfies Array<{user:string,password:string,role:'admin'|'user'}>

function dummyData(){
  const dummyData = [
  { name: 'Alice Johnson', phone: '555-123-4567', id: '1' },
  { name: 'Bob Martinez', phone: '555-987-6543', id: '2' },
  { name: 'Carla Nguyen', phone: '555-246-8101', id: '3' },
  { name: 'David Smith', phone: '555-369-1212', id: '4' },
].map(x=>({

 ...x,
 group:myGroups[Math.floor(Math.random() * 3)]

})
) as Array<ContactType>;
 return dummyData
}




interface StateInfo {
  username:string,
  loggedIn:boolean,
  login:(username:string,password:string)=>void,
  contacts:Array<ContactType>,
  addContact:(user:ContactTypeNoID) =>unknown
  removeContact:(id:string) => unknown
  editContact:(id:string,contact:ContactTypeNoID)=>unknown
  setContacts:(list:Array<ContactType>)=>any
  role:'admin'|'user'
  setGroups:(arr:string[])=>void
  groups:string[]
  deleteGroup:(name:string)=>void
  addGroup:(name:string)=>void

}




export const useGlobalStore = create<StateInfo>()( 
  
  persist((set,_get)=>{
  
  return {


    addGroup:(name)=>set(state=>({groups:Array.from(new Set([...state.groups,name]))})),


    deleteGroup:(name)=>set(state=>{
    
      const ind = state.groups.findIndex(x=>x == name)
      if (ind == -1) return ({})

      // Update contacts in the deleted group to 'No Group'
      const updatedContacts = state.contacts.filter(x=>x.group != name)

      return {
        groups: state.groups.toSpliced(ind, 1),
        contacts: updatedContacts
      }
    }),



  setGroups:(arr)=>set(x=>({groups:[...arr]})),

  groups:[...myGroups],

  role:'user',

  loggedIn:false,

  username:'',


  login:(username:string,password:string)=>set(_=>{


    const user = users.find(x=>x.user == username && x.password == password)
    if (!user) throw new Error('bad username')


    return{
     role:user.role,
    username:user.user,
    loggedIn:true
    }

   }
   ),




setContacts:(list)=>set(x=>({contacts:list})),

contacts:[...dummyData()],



addContact:(user:ContactTypeNoID)=> set(x=>{
  
 const c = {...user,id:uuidv4()}
 c.group = c.group || 'No Group'
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
},{name:'store'}
))






export function resetContacts(){
  useGlobalStore.getState().setContacts(...[dummyData()])
  useGlobalStore.getState().setGroups([...myGroups])
}