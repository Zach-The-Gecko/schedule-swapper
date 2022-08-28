import "./Navbar.css";
import Hamburger from "hamburger-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/davis-logo.webp";

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  console.log(isOpen);
  return (
    <div className="Navbar">
      <div className={`Modal Open-${isOpen}`}>
        <Link className="ModalText" to="/about">
          About
        </Link>
        <Link className="ModalText" to="/user-classes/users-uid">
          My Classes
        </Link>
        <Link className="ModalText" to="/">
          Sign in / Sign out
        </Link>
      </div>
      <img src={Logo} alt="Davis High School Logo" className="DavisImg" />
      <p>DHS Schedule Swapper</p>
      <div className="Hamburger">
        <Hamburger toggled={isOpen} toggle={setOpen} />
      </div>
    </div>
  );
};

export default Navbar;
