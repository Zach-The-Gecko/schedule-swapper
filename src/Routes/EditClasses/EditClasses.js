import { useContext } from "react";
import Page from "../../Components/Page/Page";
import { UserContext } from "../../contexts/user.context";
import "./EditClasses.css";

const EditClasses = () => {
  // eslint-disable-next-line
  const { currentUser } = useContext(UserContext);
  const keyPressed = (e) => {
    if (e.key === "Enter") {
      const rawStr = e.target.value;
      const splitStr = rawStr.split("\n");

      const studentClasses = splitStr.reduce(
        (semesterClasses, str, ind, allClasses) => {
          if (!str) {
            return semesterClasses;
          }
          if (str.includes("Semester")) {
            return [str.replace(" ", ""), semesterClasses[1]];
          }
          if (!semesterClasses[0]) {
            return semesterClasses;
          }
          if (str.includes("Period")) {
            const period = parseInt(str.split(" ").slice(-1)[0]);
            const classData = {
              period,
              class: allClasses[ind + 1],
              teacher: allClasses[ind + 2],
            };

            semesterClasses[1][semesterClasses[0]].push(classData);
            period === 11 && semesterClasses[1].Semester1.push(classData);
          }
          return semesterClasses;
        },
        [0, { Semester1: [], Semester2: [] }]
      )[1];

      console.log(studentClasses);
    }
  };
  return (
    <Page>
      <div className="EditClasses">
        <textarea onKeyDown={keyPressed}></textarea>
      </div>
    </Page>
  );
};

export default EditClasses;
