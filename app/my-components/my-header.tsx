import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { useGlobalStore } from "~/state";

export default function MyHeader() {
  const { username, loggedIn } = useGlobalStore();

  function logout(){
    localStorage.removeItem('store')
    window.location.href = '/'
  }

  return (
    <header className="w-full">
      <div className="p-4 border-b-4 bg-main">
        <div className="flex justify-between items-center">

          {/* Left side: logo and user info if logged in */}
          <div className="flex items-center gap-8">

            <Link viewTransition to={'/'}>
            <h1 className="text-xl font-bold">MySite</h1>
             </Link>

            {loggedIn && (
              <div className="flex items-center gap-4">
                <span className="text-lg font-medium">Welcome {username}</span>
                <Link viewTransition to="/logout">
                  <Button onClick={logout} >Logout</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Right side: navigation */}
          <nav className="flex gap-4 items-center">
            <Link viewTransition to="/" className="text-lg text-neutral-900 hover:text-neutral-600">Home</Link>
         
            {/* <Link viewTransition to="/about" className="text-lg text-neutral-900 hover:text-neutral-600">About</Link>
          */}
            <Link viewTransition to="/contacts" className="text-lg text-neutral-900 hover:text-neutral-600">Contacts</Link>

            <Link viewTransition to="/groups" className="text-lg text-neutral-900 hover:text-neutral-600">Groups</Link>


            {!loggedIn && (
              <Link viewTransition to="/login">
                <Button className="bg-amber-50">Login</Button>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
