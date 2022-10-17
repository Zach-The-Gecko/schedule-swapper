import React from "react";
import ClassCard from "../ClassCard/ClassCard";
import "./ListOfClassCards.css";

const ListOfClassCards = ({ classes }) => {
  return (
    <div className="ListOfClassCards">
      {Object.entries(classes).map(([index, class_]) => {
        if (class_) {
          return (
            <ClassCard
              class_={class_}
              period={class_.period}
              key={`${class_}${index}`}
            />
          );
        } else {
          return class_;
        }
      })}
    </div>
  );
};

export default ListOfClassCards;
