import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";
import "./ListOfUsers.css";

const ListOfUsers = ({ users }) => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const [searchInput, setSearchInput] = useState("");
  const searchBarChange = (e) => {
    setSearchInput(e.target.value);
  };
  return (
    <div>
      <div className="SearchBoxUsers">
        <input
          onChange={searchBarChange}
          className="SearchBarUsers"
          type="text"
          placeholder="Search Users"
        />
      </div>
      <div className="ListOfUsers">
        {users
          .filter((name) => {
            return name
              ? name.displayName
                  .toLowerCase()
                  .replace(" ", "")
                  .includes(searchInput.toLowerCase().replace(" ", ""))
              : "";
          })
          .map((user) => {
            if (user) {
              return (
                <span
                  key={user.ref}
                  onClick={() => navigate(`/user/${user.ref}`)}
                >
                  {user.displayName}
                  {currentUser.uid === user.ref && " (You)"}
                  <br key={user.ref} />
                </span>
              );
            } else {
              return "";
            }
          })}
      </div>
    </div>
  );
};

export default ListOfUsers;
