import { useContext } from "react";
import { Navigate, useSearchParams } from "react-router-dom";

import { UserContext } from "../../contexts/user.context";

import { signInWithGoogle } from "../../utils/firebase";
import "./SignIn.css";

const SignIn = () => {
  const { currentUser } = useContext(UserContext);
  const [searchParams] = useSearchParams();
  return (
    <div className="SignIn Page">
      {currentUser && (
        <Navigate
          to={
            searchParams.get("redirect") || `/users-classes/${currentUser.uid}`
          }
        />
      )}
      <div className="signInBox">
        <span>You are not signed in, please sign in to use the app.</span>
        <br />
        <span>If you just signed in, you will be redirected momentarily.</span>

        <span
          className="Button"
          onClick={() => {
            signInWithGoogle();
          }}
        >
          Sign In
        </span>
      </div>
    </div>
  );
};

export default SignIn;
