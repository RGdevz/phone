import type { PropsWithChildren } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";

interface p extends PropsWithChildren{
    onOk?:()=>void
    onCancel?:()=>void
    message:string
}

export default function NiceAlert(props:p){

    return(
   <AlertDialog>
  <AlertDialogTrigger asChild>
    
   {props.children || <h1>No children for alert</h1>}

   </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
    <AlertDialogDescription>{props.message}</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
    <AlertDialogCancel onClick={()=>props.onCancel?.()}>Cancel</AlertDialogCancel>
    <AlertDialogAction onClick={()=>props.onOk?.()}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
    )

}