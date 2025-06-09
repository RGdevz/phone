import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { useGlobalStore } from "~/state";
import { Menu, X, Phone } from "lucide-react";
import { useState } from "react";
import { cn } from "~/lib/utils";

export default function MyHeader() {
  const { username, loggedIn } = useGlobalStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function logout(){
    localStorage.removeItem('store')
    window.location.href = '/phone'
  }

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/contacts", label: "Contacts" },
    { to: "/groups", label: "Groups" },
  ];

  return (
    <header className="w-full top-0 z-50 bg-white shadow-sm">
      <div className="">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Left side: logo and user info if logged in */}
            <div className="flex items-center gap-4 lg:gap-8">
              <Link to={'/'} className="flex items-center gap-2 group">
                <div className="bg-gradient-to-r from-amber-200 to-amber-100 p-2 rounded-lg shadow-sm group-hover:shadow-md transition-all">
                  <Phone className="h-5 w-5 text-amber-700" />
                </div>
                <h1 className="text-xl font-bold text-neutral-800 group-hover:text-amber-700 transition-colors">PhoneBook</h1>
              </Link>

              {loggedIn && (
                <div className="hidden md:flex items-center gap-4">
                  <span className="text-lg font-medium">Welcome {username}</span>
                </div>
              )}
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-lg text-neutral-900 hover:text-amber-600 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              
              {loggedIn ? (
                <Button 
                  onClick={logout}
                  variant="neutral"
                  className=" hover:bg-amber-50"
                >
                  Logout
                </Button>
              ) : (
                <Link to="/login">
                  <Button className="bg-amber-100 hover:bg-amber-200 text-black">
                    Login
                  </Button>
                </Link>
              )}
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-amber-50"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden border-t",
            isMenuOpen ? "block bg-amber-50/50 backdrop-blur-sm" : "hidden"
          )}
        >
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg text-neutral-900 hover:text-amber-600 transition-colors py-2"
                >
                  {link.label}
                </Link>
              ))}
              
              {loggedIn && (
                <div className="py-2 border-t border-amber-200/50">
                  <span className="text-lg font-medium">Welcome {username}</span>
                </div>
              )}
              
              {loggedIn ? (
                <Button 
                  onClick={logout}
                  variant="neutral"
                  className="border-amber-200 hover:bg-amber-50 w-full"
                >
                  Logout
                </Button>
              ) : (
                <Link to="/login" className="w-full" onClick={() => setIsMenuOpen(false)}>
                  <Button className="bg-amber-100 hover:bg-amber-200 text-black w-full">
                    Login
                  </Button>
                </Link>
              )}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
