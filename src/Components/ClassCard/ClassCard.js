import React from "react";
import { useNavigate } from "react-router-dom";
import "./ClassCard.css";

const ClassCard = ({ class_, period, onClick }) => {
  const navigate = useNavigate();
  return (
    <div
      className={`PeriodBox Is${Boolean(class_)}`}
      onClick={() => navigate(`/class/${class_.ref}`)}
    >
      <div className="Heading">
        <span className="PeriodHeading Period">{period}</span>
        <span className="PeriodHeading">{class_ && class_.class}</span>
      </div>
      <span className="BoxContent">{class_ && class_.teacher}</span>
    </div>
  );
};

export default ClassCard;
