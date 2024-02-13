import SideNav from "@/components/SideNav/SideNav";
import TopNav from "@/components/TopNav/TopNav";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <main className="flex relative">
      <section className='w-[15%] h-screen bg-secondary fixed' >
        <SideNav />
      </section>
      <section className='w-full h-screen ml-[15%] '>
        <TopNav />
        <ScrollArea className="w-full h-[92vh] px-6 py-2">
          <Outlet />
        </ScrollArea>
      </section>
    </main>
  )
}
