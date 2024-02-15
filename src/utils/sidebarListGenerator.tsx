import { routeForBuyer } from "@/router/routeForBuyer";
import { TRole, TUserRole, TUserRoutePath } from "../types";
import { routeList } from "@/router/routeList";

function sidebarItemsGenerator(role: TRole) {
  let currentRoute: TUserRoutePath[] = [];

  if (role === TUserRole.buyer) {
    currentRoute = routeForBuyer
  } else {
    currentRoute = routeList
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