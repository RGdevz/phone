import type { Route } from "./+types/home";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Dialog } from "~/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "~/components/ui/alert-dialog";
import Contact from "~/my-components/contact";
import AddContactView from "~/my-components/add-contact";
import { resetContacts, useGlobalStore } from "~/state";
import { useEffect, useMemo, useState } from "react";
import NiceAlert from "~/my-components/nice-alert";
import { Command, CommandEmpty, CommandInput, CommandList } from "~/components/ui/command";




export function meta({}: Route.MetaArgs) {
  return [
   { title: "New React Router App" },
   { name: "description", content: "Welcome to React Router!" },
  ];
 }



export default function Home() {


  const {contacts,addContact}= useGlobalStore()

  const [search, setSearch] = useState('');

  const filteredContacts = useMemo(() => {
  
  return contacts.filter((c) =>
  c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search)
  )

  }, [contacts, search]);



 return (

  <section>
  

<div className=" grid-cols-12 lg:grid flex  flex-col-reverse lg:px-[4%]">



<div className="col-span-4 mt-5 mb-5">


  <div className=" py-3"/>

  <h1 className="text-center text-5xl mb-5 font-black hidden lg:block">Phone Book</h1>


<div className="pb-7 flex justify-center gap-2">


<NiceAlert message="Are you sure" onOk={()=>resetContacts()}>
<Button  className="mx-2 py-7 w-full max-w-[200px] bg-amber-50">Reset</Button>
</NiceAlert>

<AddContactView>
<Button className="mx-2 w-full  max-w-[200px] py-7  bg-orange-100">Add</Button>
</AddContactView>

  </div>

  </div>




  <div className="col-span-8 ">


<div className=" mx-auto px-5 max-w-[60rem] flex flex-col gap-4">

<div className="lg:py-2"/>


<Command  className="p-3 ">
  <CommandInput className=" placeholder-black" onValueChange={v=>setSearch(v)}  placeholder="Type to search..." />
</Command>


<Card className="overflow-y-auto
 lg:max-h-[65dvh]
  my-scroll
 max-h-[40rem]
 py-0
 more-shadow
  overflow-x-hidden
 flex flex-col
  gap-0 

 bg-white
  lg:p-3"> 

  {filteredContacts.length == 0 && <h1 className="text-center p-5">No results</h1>}

   {filteredContacts.map((x, i) => (
     <Contact className={i % 2 !== 0 ? 'bg-amber-50' : ''} key={x.id} {...x} />
   ))}

  </Card>

  </div>

  </div>




  </div>




  </section>

  );
}
