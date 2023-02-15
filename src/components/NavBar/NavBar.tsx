import Logo from "./Logo";
import Tabs from "./Tabs";
import UserIcon from "./UserIcon";

const NavBar = () => {
  const flexBetween = "flex items-center justify-between";
  return (
    <div className={`${flexBetween} w-full xl:max-w-[1280px] xl:m-auto`}>
      <Logo />
      <div className={`${flexBetween} w-full`}>
        <Tabs />
      </div>
      <div className="flex items-center px-2 gap-1 ">
        <UserIcon />
      </div>
    </div>
  );
};

export default NavBar;
