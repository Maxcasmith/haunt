import { AdminHome } from "./pages/admin/Home";
import { AdminListUser } from "./pages/admin/list/User";
import { AdminListLocation } from "./pages/admin/list/Location";
import { AdminReadUser } from "./pages/admin/read/User";
import { AdminReadLocation } from "./pages/admin/read/Location";

import { Home } from "./pages/Home";
import { Map } from "./pages/Map";
import { Create } from "./pages/Create";
import { Profile } from "./pages/Profile";
import { Location } from "./pages/Location";

export const routes = [
    { path: "/", redirect: "/home" },
    { path: "/home", component: Home },
    { path: "/map", component: Map },
    { path: "/create", component: Create },
    { path: "/profile/:id", component: Profile },
    { path: "/location/:id", component: Location },
    
    { path: "/admin", component: AdminHome },
    { path: "/admin/list/user", component: AdminListUser },
    { path: "/admin/list/location", component: AdminListLocation },

    { path: "/admin/read/user/:id", component: AdminReadUser },
    { path: "/admin/read/location/:id", component: AdminReadLocation },

    { path: "*", redirect: "/map" }
];
