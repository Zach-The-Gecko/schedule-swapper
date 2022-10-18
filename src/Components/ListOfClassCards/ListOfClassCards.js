import React from "react";
import ClassCard from "../ClassCard/ClassCard";
import "./ListOfClassCards.css";

const ListOfClassCards = ({ classes }) => {
  return (
    <div className="ListOfClassCards">
      {Object.values(classes).map((class_, ind) => {
        if (class_) {
          return (
            <ClassCard
              key={`${class_}${ind}`}
              class_={class_}
              period={class_.period}
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
