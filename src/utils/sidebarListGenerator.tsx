import { routeForBuyer } from "@/router/routeForBuyer";
import { TRole, TUserRole, TUserRoutePath } from "../types";
import { routeForSeller } from "@/router/routeForSeller";
import { routeForSuperAdmin } from "@/router/routeForSuperAdmin";

function sidebarItemsGenerator(role: TRole) {
  let currentRoute: TUserRoutePath[] = [];

  if (role === TUserRole.buyer) {
    currentRoute = routeForBuyer
  } else if (role === TUserRole.seller) {
    currentRoute = routeForSeller
  } else if (role === TUserRole.superAdmin) {
    currentRoute = routeForSuperAdmin
  }

  const route = currentRoute.map(item => ({
    title: item.title,
    icon: item.icon,
    path: item.path,
    children: item.children?.map(child => ({
      title: child.title,
      path: child.path,
    }))
  }))

  return route;

}

export default sidebarItemsGenerator;