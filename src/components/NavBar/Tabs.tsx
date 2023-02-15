import { useLocation, Link } from "react-router-dom";

export const tabList = [
  { name: "Search", pathname: "/search" },
  { name: "Community", pathname: "/community" },
  { name: "Ranking", pathname: "/ranking" },
];

interface TabProps {
  item: { name: string; pathname: string };
  selected: boolean;
  number?: number;
}

function Tab({ item }: TabProps) {
  return (
    <li className="text-md mx-2">
      <Link to={item.pathname}>
        <button className="nav-btn rounded px-3 min-h-8 h-8 hover:bg-gray-600">
          {item.name}
        </button>
      </Link>
    </li>
  );
}

export default function Tabs() {
  const { pathname } = useLocation();

  return (
    <div className="flex-none hidden md:flex md:flex-1 ml-2">
      <ul className="flex">
        {tabList.map((tab) => (
          <Tab
            key={tab.name}
            item={tab}
            selected={(pathname === "/" ? "/main" : pathname) === tab.pathname}
          />
        ))}
      </ul>
    </div>
  );
}
