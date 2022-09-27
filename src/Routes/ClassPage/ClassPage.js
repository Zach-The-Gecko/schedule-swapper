import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ListOfUsers from "../../Components/ListOfUsers/ListOfUsers";
import Page from "../../Components/Page/Page";
import { getClassByRefID, getUsersData } from "../../utils/firebase";
import "./ClassPage.css";

const ClassPage = () => {
  const classRef = useParams().classId;
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const asyncFunc = async () => {
      const doesClassExist = await getClassByRefID(classRef);
      if (!doesClassExist) {
        console.log(doesClassExist);
        return;
      }
      const userRefs = doesClassExist.users;
      const userPromises = userRefs.map(async (userId) => {
        if (userId) {
          return { ...(await getUsersData(userId)), userId };
        }
        return null;
      });
      const users = await Promise.all(userPromises);
      setUsers(users);
    };
    asyncFunc();
  }, [classRef]);

  return (
    <Page>
      <div className="ClassPage">
        <ListOfUsers users={users} />
        {!users.length && (
          <div className="InvalidContainer">
            <span className="InvalidLink">Not a Valid User</span>
            <br />
            <Link className="Go-There" to="/all-classes">
              Click here to find other classes →
            </Link>
          </div>
        )}
      </div>
    </Page>
  );
};

export default ClassPage;
