import { useEffect } from "react";
import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ChangeSemester from "../../Components/ChangeSemester/ChangeSemester";
import ClassCard from "../../Components/ClassCard/ClassCard";
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
      const localDataFromFB = await getUsersData(uid, semester);
      setUserData(localDataFromFB);

      const usersClassesRefs = localDataFromFB.classesRefs;
      const usersClassesObjs = usersClassesRefs.map((ref) => {
        return getClassByRefID(ref);
      });
      const fullfilledUsersClassesObjs = await Promise.all(usersClassesObjs);
      setUsersClassesObjs(fullfilledUsersClassesObjs);
    };
    asyncFunc();
  }, [uid, setUserData, semester]);

  return (
    <Page>
      <div className="UsersClasses">
        <ChangeSemester />
        {currentUser && currentUser.uid === uid && (
          <Link to="/edit-classes" className="Go-There">
            Edit Classes →
          </Link>
        )}

        <br />
        <span>{`${userData && userData.displayName}'s Classes`}</span>
        {Object.entries(usersClassesObjs).map(([period, class_]) => {
          if (class_) {
            return (
              <ClassCard
                class_={class_}
                period={period}
                key={`${class_}${period}`}
                onClick={() => {
                  console.log("Clicked");
                }}
              />
            );
          } else {
            return class_;
          }
        })}
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
