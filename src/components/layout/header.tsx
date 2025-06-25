import { MailIcon, NotificationIcon, SettingIcon } from "../icons";
import Avatar from "../ui/Avatar";
import AvatarImage from "@/assets/avatar'.jpg";

export default function Header() {
  return (
    <div className="w-full min-h-[50px] border-b border-gray-100 py-4 px-6 md:px-10 shadow shadow-gray-200 flex flex-row justify-between items-center">
      <div className="md:flex hidden text-xl font-extralight font-outfit leading-[24px]">
        Welcome back<span className="font-semibold">, Barbara</span>
      </div>
      <Avatar src={AvatarImage} className="flex md:hidden" />

      <div className="flex flex-row gap-6">
        <SettingIcon />
        <MailIcon />
        <NotificationIcon />
        <Avatar src={AvatarImage} className="hidden md:flex" />
      </div>
    </div>
  );
}
