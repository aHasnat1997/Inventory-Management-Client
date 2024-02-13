import { ReactNode, ReactElement } from "react";

export type TRoute = {
  path: string,
  element: ReactNode
};

export type TUserRoutePath = {
  path?: string,
  title: string,
  icon?: ReactElement,
  element?: ReactElement,
  children?: TUserRoutePath[]
}

export type TProduct = {
  productName: string,
  productImg?: string,
  price: number,
  quantity: number,
  category: string,
  subCategory: string,
  brand: string,
  compatibility: [string],
  condition: 'new' | 'used',
  availability: 'in-stock' | 'pre-order' | 'up-coming',
  specification?: object
}