import { TUserRole } from '@/types';
import { jwtDecode } from 'jwt-decode';

type TJwtPayload = {
  email: string,
  role: TUserRole.superAdmin | TUserRole.seller | TUserRole.buyer
}
export const verifyToken = (token: string): TJwtPayload => {
  return jwtDecode(token);
};