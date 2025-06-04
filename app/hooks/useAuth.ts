import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useGlobalStore } from "~/state";


export function useAuth() {
  const { loggedIn } = useGlobalStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login", { replace: true });
    }
  }, [loggedIn, navigate]);

  return loggedIn;
}


