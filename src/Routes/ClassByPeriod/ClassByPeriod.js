import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ListOfClassCards from "../../Components/ListOfClassCards/ListOfClassCards";
import Page from "../../Components/Page/Page";
import { SemesterContext } from "../../contexts/semester.context";
import { getClassesByPeriod } from "../../utils/firebase";
import "./ClassByPeriod.css";

const ClassByPeriod = () => {
  const { semester } = useContext(SemesterContext);
  const [periodClasses, setPeriodClasses] = useState([]);
  const period = useParams().period;
  const allClasses = period === "all";
  useEffect(() => {
    const asyncFunc = async () => {
      const fetchedPeriodClasses = await getClassesByPeriod(period, semester);
      setPeriodClasses(fetchedPeriodClasses);
    };
    asyncFunc();
  }, [period, semester]);
  console.log(periodClasses);
  return (
    <Page>
      {!allClasses && (
        <div className="ClassByPeriod">
          <span>This is Period {period}</span>
          {console.log(periodClasses)}
          <ListOfClassCards classes={periodClasses} />
        </div>
      )}
    </Page>
  );
};

export default ClassByPeriod;
