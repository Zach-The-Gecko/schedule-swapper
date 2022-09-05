import React from "react";
import "./ClassCard.css";

const ClassCard = ({ class_, period, onClick }) => {
  return (
    <div className={`PeriodBox Is${Boolean(class_)}`} onClick={onClick}>
      <div className="Heading">
        <span className="PeriodHeading Period">{period}</span>
        <span className="PeriodHeading">{class_ && class_.class}</span>
      </div>
      <span className="BoxContent">{class_ && class_.teacher}</span>
    </div>
  );
};

export default ClassCard;
