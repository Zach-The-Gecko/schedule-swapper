import { Link } from "react-router-dom";
import Page from "../../Components/Page/Page";
import "./AllClasses.css";

const AllClasses = () => {
  return (
    <Page>
      <div className="AllClasses">
        {[...Array(11)].map((_u, ind) => {
          const period = ind + 1;
          return (
            <div key={period}>
              <Link className="Go-There" to={`/classes/${period}`}>
                Period {period}
              </Link>
              <br />
            </div>
          );
        })}
        <Link className="Go-There" to="/classes/all">
          All Classes
        </Link>
      </div>
    </Page>
  );
};

export default AllClasses;
