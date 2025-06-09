import {
  HashRouter,
  Routes,
  Route,
  BrowserRouter,
} from "react-router";
import "./app.css";
import Login from "./pages/login";
import MainLayout from "./layouts/main";
import Groups from "./pages/groups";
import Contacts from "./pages/contacts";
import Home from "./pages/home";
import { useGlobalStore } from "./state";

export default function App() {
  const {loggedIn} = useGlobalStore()

  return (
    <HashRouter >
      <Routes>
        <Route path="/login" element={<Login />} />
        {loggedIn ? (
          <Route element={<MainLayout />}>
           <Route path="/groups" element={<Groups />} />
           <Route path="/contacts" element={<Contacts />} />
           <Route index element={<Home />} />
          </Route>
        ) : (
          <Route path="*" element={<Login />} />
        )}
      </Routes>
    </HashRouter>
  );
}

