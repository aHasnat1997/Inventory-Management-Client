import { useState } from 'react';
import logo from '../../assets/logo.png';
import { IoIosArrowDown } from "react-icons/io";
import { ScrollArea } from '@/components/ui/scroll-area';
import { NavLink } from 'react-router-dom';
import sidebarItemsGenerator from '@/utils/sidebarListGenerator';
import { useAppSelector } from '@/redux/hooks';
import { TRole } from '@/types';
import { Button } from '../ui/button';
import { LogOut } from 'lucide-react';
import { useAppDispatch } from "@/redux/hooks";
import { logOut } from "@/redux/features/auth/authSlice";
import { persistor } from "@/redux/store";

export default function SideNav() {
  const { role } = useAppSelector(state => state.userInfo);
  const navList = sidebarItemsGenerator(role as TRole);
  const [openStates, setOpenStates] = useState(new Array(navList.length).fill(true));
  const toggleDropdown = (index: number) => {
    const newOpenStates = [...openStates];
    newOpenStates[index] = !newOpenStates[index];
    setOpenStates(newOpenStates);
  };
  const dispatch = useAppDispatch();

  const navStyle = 'rounded-lg px-6 py-3 cursor-pointer duration-200 active:scale-95 hover:bg-accent';

  const handelLogout = () => {
    dispatch(logOut())
    localStorage.clear();
    persistor.purge();
  }

  return (
    <section className='p-2'>
      <div>
        <img src={logo} alt="logo" />
      </div>
      <div className='mt-12 h-[75vh]'>
        <ScrollArea className='w-full h-[95%] text-white border-b'>
          {navList.map((item, i) => (
            <div key={i} className='w-full text-xl font-bold duration-300'>
              {!item.children ? (
                <NavLink to={item.path as string} className={({ isActive }) => isActive ? `w-full flex items-center gap-2 bg-accent ${navStyle}` : `w-full flex items-center gap-2 ${navStyle}`}>
                  <div>{item.icon}</div>
                  <div>{item.title}</div>
                </NavLink>
              ) : (
                <div>
                  <div
                    onClick={() => toggleDropdown(i)}
                    className={` flex justify-between items-center ${navStyle}`}
                  >
                    <div className=' flex items-center gap-2'>
                      <div>{item.icon}</div>
                      {item.title}
                    </div>
                    <IoIosArrowDown className={`duration-200 ${openStates[i] ? 'rotate-180' : ''}`} />
                  </div>
                  <div className={` duration-300 origin-top ${openStates[i] ? 'h-fit' : 'h-0'}`}>
                    <div className={` py-4 space-y-6 duration-300 origin-top ${openStates[i] ? 'scale-y-100' : 'scale-y-0'}`}>
                      {item.children.map((child, j) => (
                        <div key={j}>
                          <NavLink
                            to={child.path as string}
                            className={({ isActive }) => isActive ? 'w-full bg-slate-800 rounded-lg px-16 text-center py-3 cursor-pointer duration-200 active:scale-95' : 'w-full rounded-lg px-16 text-center py-3 cursor-pointer duration-200 active:scale-95 hover:bg-slate-800'}
                          >
                            {child.title}
                          </NavLink>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </ScrollArea>
        <div className='py-4'>
          <Button
            className='w-full'
            onClick={handelLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
