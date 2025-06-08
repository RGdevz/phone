import { Button } from "~/components/ui/button"
import NiceAlert from "~/my-components/nice-alert"
import { useGlobalStore } from "~/state"

export default function Groups(){


    const {groups,deleteGroup,addGroup} = useGlobalStore()

    return (
        <div className="lg:pt-10 text-center">

    <h4 className=" text-center  font-black text-2xl">My Groups</h4>

     <div className=" flex flex-col max-w-[1000px] mx-auto gap-2 pt-5">
     
    {groups.map(x=>{return(<div key={x}>

    <NiceAlert message={"Delete group"}  onOk={()=>deleteGroup(x)}>

   <Button className="w-full">{x}</Button>

     </NiceAlert>

      </div>

    )
    }   
    )}

    
     </div>


    
     <NiceAlert message={"Add Group"} >
    <Button className="my-5 bg-amber-100" onClick={x=>addGroup('lol')}>Add Group</Button>

     </NiceAlert>



     </div>
    )

}