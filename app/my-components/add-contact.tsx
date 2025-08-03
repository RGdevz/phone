import React, { useRef, useState, type ChangeEvent, type ChangeEventHandler, type PropsWithChildren } from 'react'; // Still need React for JSX

// Import Shadcn UI components
import { Button } from "@/components/ui/button"; // Adjust path as needed
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"; // Adjust path as needed
import { Input } from "@/components/ui/input"; // Adjust path as needed
import { Label } from "@/components/ui/label"; // Adjust path as needed
import { useGlobalStore } from '~/state';
import { myGroups } from '~/constants';



function read(ev:ChangeEvent<HTMLInputElement>):Promise<string>{

  
  const files = Array.from(ev.target.files || []) 


 return new Promise((resolve, reject) => {
  if (files.length == 0){
  resolve('')
  return
  }
 const reader = new FileReader(); 
 reader.onload = () => {
 resolve(reader.result as string);
 }; 
 reader.onerror = reject; 
 reader.readAsDataURL(files[0]);
 }
 ); 


}




// Component focusing only on the JSX structure
export default function AddContactDialog(props:PropsWithChildren) {

  const [imgData,setImgData] = useState('')

    const {addContact,groups} = useGlobalStore()

    const [open,setOpen] = useState(false)

    function add(e:Event){

     e.preventDefault()

     const form = new FormData(e.target as HTMLFormElement)

     const name = form.get('name') as string
     const phone = form.get('phone') as string
     const group = form.get('group') as string
      const email = form.get('email') as string || ''

     addContact({name:name,phone:phone,group:group,email:email,img:imgData})

     setOpen(false)

    }



    return (
        <Dialog open={open} onOpenChange={setOpen}> {/* No open or onOpenChange props */}
            {/* The trigger element */}
            <DialogTrigger asChild>
               {props.children || <h1 style={{color:'red'}}>dialog component need child</h1>}
            </DialogTrigger>

            {/* The content of the dialog */}
            <DialogContent
             onOpenAutoFocus={e=>e.preventDefault()}
             className="sm:max-w-[425px]">
             

                <DialogHeader>
                <DialogTitle>Add New Contact</DialogTitle>
                <DialogDescription>
                  Enter the details for the new contact below. Click save when done.
                 </DialogDescription>
                </DialogHeader>

             {/*@ts-ignore*/}
              <form onSubmit={add}>
                <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                 <Label htmlFor="name-static" className="text-right">
                  Name
                 </Label>
                 <Input

                  aria-autocomplete={'none'}
                     required
                     minLength={1}
                      name='name'
                    className="col-span-3"
                    placeholder="e.g., John Doe"
                     
                    />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone-static" className="text-right"> Phone </Label>
                    <Input
                  aria-autocomplete={'none'}
                  required
                  minLength={1}
                 name='phone'
                className="col-span-3"
                placeholder="e.g., 555-1234"
                type="tel"
                          
               />


    

               <Label htmlFor="email" className="text-right"> Email </Label>
                <Input
                aria-autocomplete={'none'}
                name="email"
                id="email"
                type="email"
                placeholder='email address'
                className="col-span-3"
                />

                

               <Label className="text-right"> Group </Label>
                <select  name="group" className=" col-span-3 p-1 rounded-base border-2 bg-white">
               {groups.map(x=><option>{x}</option>)}
                 </select>


              <Label htmlFor='img' className='text-right'>Image</Label>
               <input type='file' id='img' onChange={async(ev)=>{

               const img =await read(ev)
               setImgData(img)

               }} 
               className="col-span-3"
              name='img'>
              </input>


                </div>


                </div>

               {imgData && (
                <img  className='h-50 w-50 pb-5 m-auto object-cover'
                
                src={imgData}></img>
                )}



                {/* Dialog actions - No onClick handlers */}
                <DialogFooter>
                {/* Cancel button using DialogClose for basic close behavior */}
                <DialogClose asChild>
                <Button type="button" > Cancel </Button>
                </DialogClose>
                {/* Save button - No onClick */}
                <Button  type="submit">Save</Button>

                </DialogFooter>


                </form>

            </DialogContent>
        </Dialog>
    );
}