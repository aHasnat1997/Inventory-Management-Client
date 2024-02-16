import { IoSearchOutline } from "react-icons/io5";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useAppSelector } from "@/redux/hooks";

export default function TopNav() {
  const userInfo = useAppSelector(state => state.userInfo);

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
        <Avatar className="cursor-pointer">
          {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
          {
            userInfo.userImg ?
              <AvatarImage src={userInfo.userImg} alt="user image" /> :
              <div className="size-10 rounded-full bg-primary flex items-center justify-center font-bold">
                {userInfo.username.firstName?.charAt(0)}
                {userInfo.username.lastName?.charAt(0)}
              </div>
          }
        </Avatar>
      </div>
    </nav>
  )
}
