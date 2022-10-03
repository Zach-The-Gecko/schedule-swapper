// RN IT RETURNS THE INDEXES, STILL NEED TOP
//MAP OVER LETTERS AND HIGHLIGHT SPECIFIC LETTERS SOMEHOW
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
  const search = (input, displayName) => {
    const regexStr = Array.from(input.replace(" ", "").toLowerCase()).reduce(
      (acc, letter) => {
        return acc + `${letter}.*`;
      },
      ""
    );
    const testReg = new RegExp(regexStr, "gm");
    if (testReg.test(displayName.toLowerCase())) {
      const searchedIndexes = Array.from(displayName.toLowerCase()).reduce(
        (acc, letter, index) => {
          if (input[acc[1]] === letter) {
            return [[...acc[0], index], acc[1] + 1];
          }
          return acc;
        },
        [[], 0]
      )[0];
      return searchedIndexes;
    }
    return false;
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
            if (name) {
              return search(searchInput, name.displayName);
            }
            return false;
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
