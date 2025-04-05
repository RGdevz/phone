import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card"; // Assuming you have a Card component

export default function MyHeader() {
  return (
    <header className=" w-full ">
      <div className="p-4 border-b-4 bg-main">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">MySite</h1>
          <nav className="flex gap-4">
          
            <Link viewTransition to="/" className="text-lg text-neutral-900 hover:text-neutral-600 m-auto">Home</Link>
            <Link viewTransition to="/about" className="text-lg text-neutral-900 hover:text-neutral-600 m-auto">About</Link>
            
            <Link viewTransition to="/login"><Button className=" bg-amber-50">Login</Button></Link>

          </nav>
        </div>
      </div>
    </header>
  );
}
