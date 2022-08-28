import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";
import "./Page.css";

const Page = ({ children, signInPage }) => {
  const { currentUser } = useContext(UserContext);
  return (
    <div className="Page">
      {!currentUser && (
        <Navigate to={`/sign-in?redirect=${window.location.pathname}`} />
      )}
      {children}
    </div>
  );
};

export default Page;
