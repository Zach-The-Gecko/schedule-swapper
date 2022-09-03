import { useEffect } from "react";
import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ClassCard from "../../Components/ClassCard/ClassCard";
import Page from "../../Components/Page/Page";
import { UserContext } from "../../contexts/user.context";
import { getPeriodsClasses } from "../../utils/firebase";
import "./UsersClasses.css";

const UsersClasses = () => {
  const uid = useParams().uid;
  const { currentUser } = useContext(UserContext);
  const [usersClassesRefs, setUsersClassesRefs] = useState([]);
  const [usersClassObjs, setUsersClassObjs] = useState([]);
  useEffect(() => {
    if (currentUser && currentUser.uid === uid) {
      setUsersClassesRefs(currentUser.classes);
    }
  }, [currentUser, uid]);
  console.log(usersClassesRefs);
  console.log();
  return (
    <Page>
      <div className="UsersClasses">
        <p>Users Uid: {uid}</p>
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
