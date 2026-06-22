import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";

const NavBar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0  flex justify-between items-center px-15 py-5 border-b border-default bg-transparent">
      <div className="flex gap-15 items-center">
        {/*Logo*/}
        <div>
          <Link to="/">
            <h4 className="font-bold">GitHero</h4>
          </Link>
        </div>

        {/*NavLinks*/}
        <ul className="flex justify-evenly gap-10">
          <li className="hover:text-gray-300 cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-gray-300 cursor-pointer">
            <a href="#AboutUs">About us</a>
          </li>
          <li className="hover:text-gray-300 cursor-pointer">
            <a href="#Features">Feature</a>
          </li>
          <li className="hover:text-gray-300 cursor-pointer">
            <a href="#FAQs">FAQs</a>
          </li>
        </ul>
      </div>

      {/*Buttons*/}

      <div className="flex gap-1">
        <Link to="/login">
          <Button bcolor="nonoutline">Sign in</Button>
        </Link>
        <Link to="/signup">
          <Button bcolor="primary">Sign up</Button>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
