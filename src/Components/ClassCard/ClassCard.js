import React from "react";
import "./ClassCard.css";

const ClassCard = ({ class_, period, onClick }) => {
  return (
    <div className={`PeriodBox Is${Boolean(class_)}`} onClick={onClick}>
      <span className="PeriodHeading">Period {parseInt(period) + 1}</span>
      <span className="BoxContent">{class_.class}</span>
      <span className="BoxContent">{class_.teacher}</span>
    </div>
  );
};

export default ClassCard;
