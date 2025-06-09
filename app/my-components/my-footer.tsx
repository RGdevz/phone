import { Link } from "react-router";
import { Button } from "~/components/ui/button";

export default function MyFooter() {
  return (
    <footer className="flex items-center justify-between px-6 py-4 mt-5 border-t-3  bg-white text-foreground">
      <p className="text-sm">&copy; {new Date().getFullYear()} MySite</p>
      <nav className="flex gap-4">
  
        {/* <Button asChild variant="neutral">
          <Link to="/about">About</Link>
        </Button> */}
      </nav>
    </footer>
  );
}
