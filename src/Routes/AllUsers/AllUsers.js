import { useEffect, useState } from "react";
import Page from "../../Components/Page/Page";
import { getAllUsers } from "../../utils/firebase";
import ListOfUsers from "../../Components/ListOfUsers/ListOfUsers";
import "./AllUsers.css";

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const asyncFunc = async () => {
      const allUsersObjs = await getAllUsers();
      const arrayOfAllUsers = Object.entries(allUsersObjs).map(
        ([userRef, userObj]) => {
          return { ...userObj, userRef };
        }
      );
      setUsers(arrayOfAllUsers);
    };
    asyncFunc();
  }, [setUsers]);
  return (
    <Page>
      <div className="AllUsers">
        <ListOfUsers users={users} />
      </div>
    </Page>
  );
};

export default AllUsers;
