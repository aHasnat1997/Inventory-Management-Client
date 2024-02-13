import { TUserRoutePath } from "../types";
import { routeList } from "@/router/routeList";

function sidebarItemsGenerator() {
  const currentRoute: TUserRoutePath[] = routeList;

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