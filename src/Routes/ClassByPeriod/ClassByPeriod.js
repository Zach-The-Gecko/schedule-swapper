import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChangeSemester from "../../Components/ChangeSemester/ChangeSemester";
import ListOfClassCards from "../../Components/ListOfClassCards/ListOfClassCards";
import Page from "../../Components/Page/Page";
import { SemesterContext } from "../../contexts/semester.context";
import { getAllClasses, getClassesByPeriod } from "../../utils/firebase";
import "./ClassByPeriod.css";

const ClassByPeriod = () => {
  const { semester } = useContext(SemesterContext);
  const [periodClasses, setPeriodClasses] = useState([]);
  const period = useParams().period;
  const allClasses = period === "all";
  useEffect(() => {
    const asyncFunc = async () => {
      if (!allClasses) {
        const fetchedPeriodClasses = await getClassesByPeriod(period, semester);
        setPeriodClasses(fetchedPeriodClasses);
      } else {
        const allClasses = await getAllClasses(semester);
        console.log(allClasses);
        setPeriodClasses(
          allClasses.sort((a, b) => {
            return a.period - b.period;
          })
        );
      }
    };
    asyncFunc();
  }, [period, semester, allClasses]);
  return (
    <Page>
      <div className="ClassByPeriod">
        <ChangeSemester />
        <div>
          <span>This is Period {period}</span>
          <ListOfClassCards classes={periodClasses} />
        </div>
      </div>
    </Page>
  );
};

export default ClassByPeriod;
