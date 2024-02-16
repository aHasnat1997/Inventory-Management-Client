import { routeForBuyer } from "@/router/routeForBuyer";
import { TRoute, TUserRoutePath } from "../types";
import { routeForSeller } from "@/router/routeForSeller";
import { routeForSuperAdmin } from "@/router/routeForSuperAdmin";


function routeGenerator() {
  const allRoutes: TUserRoutePath[] = [];
  allRoutes.push(...routeForBuyer, ...routeForSeller, ...routeForSuperAdmin);

  const route = allRoutes.reduce((acc: TRoute[], item) => {
    if (item.path && item.element) {
      acc.push({
        path: item.path,
        element: item.element
      })
    } else if (item.children) {
      item.children.forEach(child => {
        acc.push({
          path: child.path!,
          element: child.element
        })
      })
    }

    return acc;
  }, [])

  return route
}

export default routeGenerator;
