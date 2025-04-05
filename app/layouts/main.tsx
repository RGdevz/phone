import { Outlet } from "react-router"
import MyFooter from "~/my-components/my-footer"
import MyHeader from "~/my-components/my-header"

export default function MainLayout(){

    return(

        <div className=" min-h-dvh flex flex-col">

       <MyHeader/>
        
        <div style={{flex:1}}>
        <Outlet></Outlet>
        </div>
        
        <MyFooter/>

        </div>

    )

}