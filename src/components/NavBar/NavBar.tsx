import { useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { ImMenu } from "react-icons/im";
import { RiNotificationLine } from "react-icons/ri";
import Logo from "../Logo";

type TNavTabOption = {
  id: string;
  path: string;
  label: string;
};

const navTabOptions: TNavTabOption[] = [
  {
    id: "home",
    path: "home",
    label: "Home",
  },
  {
    id: "tv-shows",
    path: "tv-shows",
    label: "TV Shows",
  },
  {
    id: "movies",
    path: "movies",
    label: "Movies",
  },
  {
    id: "news-and-popular",
    path: "news-and-popular",
    label: "News & Popular",
  },
  {
    id: "my-list",
    path: "my-list",
    label: "My List",
  },
  {
    id: "browse-by-languages",
    path: "browse-by-languages",
    label: "Browse by Languages",
  },
];

type Props = {
  transparent?: boolean;
};

const NavBar = ({ transparent }: Props) => {
  const [selectedNavTabOptionId, setSelectedNavTabOptionId] = useState<string>(
    navTabOptions[0]?.id || "home"
  );

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-20 flex select-none justify-between py-4 px-4 transition-all duration-500 md:px-16 ${
        transparent ? "bg-transparent" : "bg-zinc-900"
      }`}
    >
      <div className="flex items-center gap-8">
        <Logo />
        <div className="hidden items-center gap-4 lg:flex">
          {navTabOptions.map((navTabOption) => (
            <div
              key={`nav-tab-option--${navTabOption.id}`}
              onClick={() => setSelectedNavTabOptionId(navTabOption.id)}
              className="group relative cursor-pointer text-sm"
            >
              <div
                className={`absolute inset-0 flex items-center justify-center whitespace-nowrap drop-shadow-md ${
                  selectedNavTabOptionId === navTabOption.id
                    ? "font-black text-purple-500 group-hover:text-purple-500"
                    : "font-light text-white group-hover:text-purple-300"
                }`}
              >
                <div>{navTabOption.label}</div>
              </div>
              <div className="whitespace-nowrap opacity-0">
                {navTabOption.label}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="hidden items-center gap-4 text-sm lg:flex">
        <div className="drop-shadow-md">
          <FiSearch className="text-2xl" />
        </div>
        <div className="drop-shadow-md">Kids</div>
        <div className="drop-shadow-md">
          <RiNotificationLine className="text-2xl" />
        </div>
        <div className="drop-shadow-md">
          <FaUserCircle className="text-2xl" />
        </div>
        <div className="drop-shadow-md">
          <AiOutlineCaretDown />
        </div>
      </div>
      <div className="flex items-center text-2xl lg:hidden">
        <div className="drop-shadow-md">
          <ImMenu />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
