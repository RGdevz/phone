import {
  HashRouter,
  Routes,
  Route,
  BrowserRouter,
} from "react-router";
import "./app.css";
import Login from "./pages/login";
import MainLayout from "./layouts/main";
import Groups from "./pages/groups";
import Contacts from "./pages/contacts";
import Home from "./pages/home";
import { useGlobalStore } from "./state";
import GenericDialog from "./my-components/generic-dialog";
import { useEffect, useState } from "react";
import { useEffectOnce } from "./hooks/useEffectOnce";

 const dialogEvent = new EventTarget()

 export const showDialog = (message:string) =>{

  dialogEvent.dispatchEvent(new CustomEvent('message',{detail:{message:message}}))

 }


export default function App() {
  const {loggedIn} = useGlobalStore()

  const [open,setOpen] = useState(false)
  const [message,setMessage] = useState('')

  useEffectOnce(()=>{
 
  dialogEvent.addEventListener('message',(ev)=>{

   const event = ev as CustomEvent;

   setOpen(true)
   setMessage(event.detail.message)

  }
  )

  }
  )


  return (
    <HashRouter >

     <GenericDialog open={open}
      onOpenChange={setOpen}
     title="Alert" 
     trigger={(<div style={{display:'none'}}></div>)}>
     
     <div>{message}</div>
     
     </GenericDialog>

      
      <Routes>
        <Route path="/login" element={<Login />} />

        {loggedIn ? (
          <Route element={<MainLayout />}>
           <Route path="/groups" element={<Groups />} />
           <Route path="/contacts" element={<Contacts />} />
           <Route index element={<Home />} />
          </Route>
          ) : (
          <Route path="*" element={<Login />} />
        )}
      </Routes>
    </HashRouter>
  );
}

