import React, { useRef, useState, type PropsWithChildren } from 'react'; // Still need React for JSX

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
import { FocusScope } from '@radix-ui/react-focus-scope';
import { myGroups } from '~/constants';



// Component focusing only on the JSX structure
export default function AddContactView(props:PropsWithChildren) {


    const {addContact} = useGlobalStore()

    const [open,setOpen] = useState(false)

    function add(e:Event){

     e.preventDefault()

     const form = new FormData(e.target as HTMLFormElement)

     const name = form.get('name') as string
     const phone = form.get('phone') as string
     const group = form.get('group') as string

     addContact({name:name,phone:phone,group:group})

     setOpen(false)

    }



    return (
        <Dialog open={open} onOpenChange={setOpen}> {/* No open or onOpenChange props */}
            {/* The trigger element */}
            <DialogTrigger asChild>
               {props.children || <h1>no childrens</h1>}
            </DialogTrigger>

            {/* The content of the dialog */}
            <DialogContent onOpenAutoFocus={e=>e.preventDefault()} className="sm:max-w-[425px]">
             
            

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


               <Label className="text-right"> Group </Label>
                <select  name="group" className=" col-span-3 p-1 rounded-base border-2 bg-white">
               {myGroups.map(x=><option>{x}</option>)}
                 </select>

                 </div>
                </div>


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