import { useEffect } from "react";
import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ClassCard from "../../Components/ClassCard/ClassCard";
import Page from "../../Components/Page/Page";
import { UserContext } from "../../contexts/user.context";
import { getClassByRefID, getUsersData } from "../../utils/firebase";
import "./UsersClasses.css";

const UsersClasses = () => {
  const uid = useParams().uid;
  const { currentUser } = useContext(UserContext);
  const [userData, setUserData] = useState({});
  const [usersClassesObjs, setUsersClassesObjs] = useState([]);

  useEffect(() => {
    const asyncFunc = async () => {
      const localDataFromFB = await getUsersData(uid);
      setUserData(localDataFromFB);

      const usersClassesRefs = localDataFromFB.classesRefs;
      const usersClassesObjs = usersClassesRefs.map((ref, period) => {
        return getClassByRefID(ref);
      });
      const fullfilledUsersClassesObjs = await Promise.all(usersClassesObjs);
      setUsersClassesObjs(fullfilledUsersClassesObjs);
    };
    asyncFunc();
  }, [uid, setUserData]);

  return (
    <Page>
      <div className="UsersClasses">
        <span>Users Uid: {uid}</span>
        <br />
        <span>{`${userData.displayName}'s Classes`}</span>
        {usersClassesObjs.map((class_, period) => (
          <ClassCard
            class_={class_}
            period={period}
            key={`${class_}${period}`}
            onClick={() => {
              console.log("Clicked");
            }}
          />
        ))}
        {currentUser && currentUser.uid === uid && (
          <Link to="/edit-classes" className="Go-There">
            Edit Classes →
          </Link>
        )}
      </div>
    </Page>
  );
};

export default UsersClasses;

// hash Func -------------------------------------------------------------
// const str = "mancini_biology_0" + Math.random() + new Date();
// let hash = 0;
// for (let i = 0, len = str.length; i < len; i++) {
//   let chr = str.charCodeAt(i);
//   hash = (hash << 5) - hash + chr;
//   hash |= 0; // Convert to 32bit integer
// }
