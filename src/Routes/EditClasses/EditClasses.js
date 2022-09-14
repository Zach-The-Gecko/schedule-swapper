import { useContext } from "react";
import Page from "../../Components/Page/Page";
import { UserContext } from "../../contexts/user.context";
import {
  changeClass,
  classExists,
  getUsersData,
  submitClassToFB,
} from "../../utils/firebase";
import "./EditClasses.css";

const EditClasses = () => {
  const { currentUser } = useContext(UserContext);
  const keyPressed = (e) => {
    if (e.key === "Enter") {
      const rawStr = e.target.value;
      const splitStr = rawStr.split("\n").reduce((validStr, currentStr) => {
        return currentStr ? [...validStr, currentStr] : [...validStr];
      }, []);

      const studentClasses = splitStr.reduce(
        (semesterClasses, str, ind, allClasses) => {
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
              semester: semesterClasses[0],
              class: allClasses[ind + 1],
              teacher: allClasses[ind + 2],
            };

            semesterClasses[1].push(classData);
            period === 11 &&
              semesterClasses[1].push({ ...classData, semester: "Semester1" });
          }
          return semesterClasses;
        },
        [0, []]
      )[1];

      studentClasses.map(async (class_) => {
        const classThatExists = await classExists(class_);
        if (!classThatExists) {
          console.log("Creating Brand New Class");
          submitClassToFB(class_, currentUser.uid);
        } else {
          const userDataFromFB = await getUsersData(
            currentUser.uid,
            class_.semester.charAt(class_.semester.length - 1)
          );
          const usersClasses = userDataFromFB.classes;
          if (classThatExists !== usersClasses[class_.period]) {
            console.log("Changing Class");
            changeClass(
              usersClasses[class_.period],
              classThatExists,
              currentUser.uid
            );
          }
        }
      });
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
