import { useEffect } from "react";
import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ChangeSemester from "../../Components/ChangeSemester/ChangeSemester";
import ListOfClassCards from "../../Components/ListOfClassCards/ListOfClassCards";
import Page from "../../Components/Page/Page";
import { SemesterContext } from "../../contexts/semester.context";
import { UserContext } from "../../contexts/user.context";
import { getClassByRefID, getUsersData } from "../../utils/firebase";
import "./UsersClasses.css";

const UsersClasses = () => {
  const uid = useParams().uid;
  const { currentUser } = useContext(UserContext);
  const { semester } = useContext(SemesterContext);
  const [userData, setUserData] = useState({});
  const [usersClassesObjs, setUsersClassesObjs] = useState([]);

  useEffect(() => {
    const asyncFunc = async () => {
      const userData = await getUsersData(uid, semester);
      setUserData(userData);
      if (!userData) {
        return;
      }

      const usersClassesRefs = userData.classes;
      const usersClassesPromises = usersClassesRefs.map((ref) => {
        return getClassByRefID(ref);
      });
      const usersClasses = await Promise.all(usersClassesPromises);
      setUsersClassesObjs(usersClasses);
    };
    asyncFunc();
  }, [uid, setUserData, semester]);

  return (
    <Page>
      <div className="UsersClasses">
        {userData && <ChangeSemester />}
        {currentUser && currentUser.uid === uid && (
          <Link to="/edit-classes" className="Go-There">
            Edit Classes →
          </Link>
        )}

        <br />
        <span>
          {userData ? (
            `${userData.displayName}'s Classes`
          ) : (
            <div className="InvalidContainer">
              <span className="InvalidLink">Not a Valid User</span>
              <br />
              <Link className="Go-There" to="/all-users">
                Click here to go to see all users →
              </Link>
            </div>
          )}
        </span>

        <ListOfClassCards classes={usersClassesObjs} />
      </div>
    </Page>
  );
};

export default UsersClasses;
