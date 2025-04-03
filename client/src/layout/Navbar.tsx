import logo from "../assets/logo.png";
import { useScrollBorder } from "../hooks/useScroll";
import { Link } from "react-router";
import { FaHamburger, FaShoppingCart, FaUser } from "react-icons/fa";
import { MdContactPhone } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

const navItems = [
  { icon: <FaHamburger />, link: "/menu" },
  { icon: <FaLocationDot />, link: "/location" },
  { icon: <MdContactPhone />, link: "/contact" },
  { icon: <FaUser />, link: "/profile" },
  { icon: <FaShoppingCart />, link: "/cart" },
];

export const Navbar = () => {
  const scrolled = useScrollBorder(7);

  return (
    <nav className=" h-fit flex items-center justify-between w-full  rounded-3xl  ">
      <div
        className={`flex flex-row items-center gap-2 bg-white rounded-3xl pr-2 pl-3 py-4 ml-1 transition-all duration-300 ${
          scrolled ? "border-2 border-yellow-500 shadow-md" : ""
        }`}
      >
        <h1 className="text-4xl font-bold  text-yellow-500">
          <Link to="/">BURGIR</Link>
        </h1>
        <img
          src={logo}
          alt="logo"
          className="h-10 hover:translate-x-6 transition-all duration-500"
        />
      </div>

      <ul className="list-none flex flex-row gap-4 bg-yellow-500 p-2 mr-1 rounded-3xl text-white">
        {navItems.map((item, index) => (
          <li
            key={index}
            className="bg-red  hover:bg-yellow-600 transition-all duration-500  flex p-2 rounded-full"
          >
            <Link to={item.link}>{item.icon}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
