import { routeList } from "@/router/routeList";
import { TRoute, TUserRoutePath } from "../types";


function routeGenerator() {
  const currentRoute: TUserRoutePath[] = routeList;

  const route = currentRoute.reduce((acc: TRoute[], item) => {
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
