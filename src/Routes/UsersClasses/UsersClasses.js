import { useParams } from "react-router-dom";
import Page from "../../Components/Page/Page";
import "./UsersClasses.css";

const UsersClasses = () => {
  const uid = useParams().uid;
  return (
    <Page>
      <div className="UsersClasses">
        <p>Users Uid: {uid}</p>
      </div>
    </Page>
  );
};

export default UsersClasses;
