import { IoSearchOutline } from "react-icons/io5";
import AvatarDropdownMenu from "../AvatarDropdownMenu/AvatarDropdownMenu";

export default function TopNav() {
  return (
    <nav className="w-full py-4 px-16 bg-accent flex justify-between items-center shadow-lg">
      <div className="w-1/3 flex items-center relative">
        <IoSearchOutline className="text-4xl ml-2 absolute text-white" />
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-transparent placeholder-white text-white border rounded-lg pl-12 pr-6 py-2"
        />
      </div>
      <div className="flex items-center gap-4">
        <AvatarDropdownMenu />
      </div>
    </nav>
  )
}
