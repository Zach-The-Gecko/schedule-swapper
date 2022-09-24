import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Page from "../../Components/Page/Page";
import { getClassByRefID, getUsersData } from "../../utils/firebase";
import "./ClassPage.css";

const ClassPage = () => {
  const navigate = useNavigate();
  const classRef = useParams().classId;
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const asyncFunc = async () => {
      const userRefs = (await getClassByRefID(classRef)).users;
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
        {users.map((user) => {
          if (user) {
            return (
              <span
                key={user.ref}
                onClick={() => navigate(`/user/${user.ref}`)}
              >
                {user.displayName}
                <br key={user.ref} />
              </span>
            );
          } else {
            return "";
          }
        })}
      </div>
    </Page>
  );
};

export default ClassPage;
