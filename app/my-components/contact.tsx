
import React from "react";
import { useRef, useState } from "react";
import type { DialogProps } from "vaul";
import { Button } from "~/components/ui/button";


import { Card } from "~/components/ui/card";
import  { DialogHeader, DialogFooter, DialogTrigger, DialogTitle, DialogDescription, DialogContent, Dialog } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { cn } from "~/lib/utils";
import { useGlobalStore } from "~/state";
import NiceAlert from "./nice-alert";
import { FocusScope } from "@radix-ui/react-focus-scope";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";


interface p extends  Omit<React.ComponentProps<'div'>,'id'>{
  name:string
  phone:string
  id:string
} 

export default function Contact(props:p){

  const {removeContact,editContact} = useGlobalStore()

  const [open,setOpen] = useState(false)


  const save = (e:Event) =>{

    e.preventDefault()

    const form = new FormData(e.target as HTMLFormElement)

    const name = form.get('name') as string
    const phone = form.get('phone') as string

    editContact(props.id,{name,phone})

    setOpen(false)

  }
    


   return(

    <>

   <div className="cursor-pointer" onClick={()=>setOpen(true)} >

    <div className={cn('p-6 ','bg-main border-2',props.className)}>
  
    <div className="flex items-center space-x-4">
     
     <Avatar >
    <AvatarImage src="asd" />
    <AvatarFallback>{props.name.split(/\s+/).filter(Boolean).map(x=>x[0].toUpperCase()).join('')}</AvatarFallback>
    </Avatar>

      <div className="flex flex-col">
      {/* Name */}
      <h2 className="text-lg font-semibold">{props.name}</h2>
      {/* Phone Number */}
      <p className="text-sm text-gray-600">{props.phone}</p>
      </div>

    </div>

    
   </div>

   </div>



  <Dialog open={open} onOpenChange={setOpen} >
  <DialogContent onOpenAutoFocus={e=>e.preventDefault()} className="sm:max-w-[425px]">


    <DialogHeader>
    <DialogTitle>Edit contact info</DialogTitle>
    <DialogDescription>
      Make changes to the contact here. Click save when youre done.
    </DialogDescription>
    </DialogHeader>

  {/*@ts-ignore */}
   <form onSubmit={save}>
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label  htmlFor="name" className="text-right"> Name </Label>
        <Input 
        required
        aria-autocomplete={'none'}
        min={1}
        id="name"
        name="name"
        defaultValue={props.name}
        className="col-span-3"
        />
       </div>
       <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="phone" className="text-right"> Phone </Label>
        <Input
         aria-autocomplete={'none'}
        required
        minLength={1}
        name="phone"
        id="phone"
        type="tel"
        defaultValue={props.phone}
        className="col-span-3"
        />
      </div>
    </div>


    <DialogFooter>
      
  <div className="flex gap-3 lg:flex-row flex-col">


  <NiceAlert message="Click continue to delete the contact" 
  onOk={()=>{
   removeContact(props.id)
   setOpen(false)
  }
  }>

  <Button type="button" className=" bg-red-400">Delete</Button>
  </NiceAlert>



   <Button   type="submit">Save changes</Button>
   </div>

    </DialogFooter>
    </form>


  </DialogContent>
</Dialog>




  </>

   )
}