import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router";
import { useGlobalStore } from "~/state";
import type { FormEventHandler } from "react";
import { showDialog } from "~/root";


export default function LoginPage() {

  const {login:loginFunc} = useGlobalStore()
  
  const navigate = useNavigate();

  function sumbitForm(e:Event){
    e.preventDefault()
    try{
      
    const _formData = new FormData(e.target as HTMLFormElement)

    const username= _formData.get('username') as string
    const password = _formData.get('password') as string
    const password2 = _formData.get('password2') as string
  
    if (password != password2){

     showDialog('passwords not match')
      return
    }

    loginFunc(username,password)

    navigate('/')
    
  }catch(e){
    showDialog(String(e))
   }
    
  }

  return (
    <div className="min-h-dvh flex items-center justify-center bg-muted px-4">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
        </CardHeader>
 
       {/*@ts-ignore*/}
         <form onSubmit={sumbitForm} method="post">



      <CardContent className="space-y-4">
     <div className="text-sm border border-muted rounded-md p-3 bg-muted/50">
    <p className="font-semibold mb-1">Demo Users:</p>
    <ul className="list-disc list-inside space-y-1">
    <li><code>admin</code>: <b>roei</b> / <b>123</b></li>
    <li><code>user</code>: <b>user</b> / <b>123</b></li>
    </ul>
   </div>

  <div className="space-y-2">
    <Label htmlFor="username">Username</Label>
    <Input name="username" id="username" type="text" placeholder="User name" />
  </div>

  <div className="space-y-2">
    <Label htmlFor="password">Password</Label>
    <Input name="password" id="password" type="password" placeholder="********" />
  </div>

    <div className="space-y-2">
    <Label htmlFor="password">Password Confirmation</Label>
    <Input name="password2" id="password2" type="password" placeholder="********" />
  </div>

  <Button type="submit" className="w-full bg-amber-50">Sign in</Button>

  <p className="text-center text-sm text-muted-foreground mt-2">
    <Link viewTransition to="/" className="underline hover:text-primary">
      {/* ← Back to Home */}
    </Link>
  </p>
</CardContent>

      
   </form>
      




      </Card>
    </div>
  );
}
