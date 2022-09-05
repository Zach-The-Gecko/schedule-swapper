import React from "react";
import { useContext } from "react";
import { SemesterContext } from "../../contexts/semester.context";
import "./ChangeSemester.css";
import Switch from "react-switch";

const ChangeSemester = () => {
  const { semester, setSemester } = useContext(SemesterContext);

  const changeSemester = () => {
    setSemester(semester - 1 ? 1 : 2);
  };
  return (
    <div className="semesterBox">
      <span className={`semText sem1${semester}`}>Semester 1</span>
      <Switch
        className="switch"
        checked={Boolean(semester - 1)}
        onChange={changeSemester}
        uncheckedIcon={false}
        checkedIcon={false}
        offColor="#000"
        onColor="#000"
        height={20}
        handleDiameter={20}
        width={40}
      />
      <span className={`semText sem2${semester}`}>Semester 2</span>
    </div>
  );
};

export default ChangeSemester;
