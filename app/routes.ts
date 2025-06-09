import { type RouteConfig, index,layout, route } from "@react-router/dev/routes";


export default [
    
    route('/login','pages/login.tsx'),

   layout('layouts/main.tsx',[

    route('/groups','pages/groups.tsx'),

    route('/contacts','pages/contacts.tsx'),
    index("pages/home.tsx")

   ])
   
  

] satisfies RouteConfig;
