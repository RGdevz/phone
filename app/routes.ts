import { type RouteConfig, index,layout, route } from "@react-router/dev/routes";

export default [

    
    route('/login','pages/login.tsx'),

   layout('layouts/main.tsx',[

    index("pages/home.tsx")

   ])
   
  

] satisfies RouteConfig;
