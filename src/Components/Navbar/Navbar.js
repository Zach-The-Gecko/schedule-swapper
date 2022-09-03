import "./Navbar.css";
import Hamburger from "hamburger-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/davis-logo.webp";
import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { signInWithGoogle, signOutUser } from "../../utils/firebase";

const Navbar = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { currentUser } = useContext(UserContext);
  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div className="Navbar">
      <div className={`Modal Open-${isModalOpen}`}>
        <Link className="ModalText" onClick={closeModal} to="/about">
          About
        </Link>
        <Link
          className="ModalText"
          onClick={closeModal}
          to={`/users-classes/${currentUser ? currentUser.uid : "null"}`}
        >
          My Classes
        </Link>
        <Link className="ModalText" onClick={closeModal} to="/">
          All Classes
        </Link>
        <Link className="ModalText" onClick={closeModal} to="/">
          All People
        </Link>
        {currentUser ? (
          <span
            className="ModalText"
            onClick={() => {
              signOutUser();
              closeModal();
            }}
          >
            Sign Out
          </span>
        ) : (
          <span
            className="ModalText"
            onClick={() => {
              signInWithGoogle();
              closeModal();
            }}
          >
            Sign In
          </span>
        )}
      </div>
      <img src={Logo} alt="Davis High School Logo" className="DavisImg" />
      <p>DHS Schedule Swapper</p>
      <div className="Hamburger">
        <Hamburger toggled={isModalOpen} toggle={setModalOpen} />
      </div>
    </div>
  );
};

export default Navbar;
