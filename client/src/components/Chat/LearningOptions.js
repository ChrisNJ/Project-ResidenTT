import React from "react";

import "./LearningOption.css";

const LearningOptions = (props) => {
  const options = [
    {
      text: "Family Court",
      handler: props.actionProvider.handleFamilyCourtList,
      id: 1,
    },
    { 
      text: "Magistrate's Court", 
      handler: props.actionProvider.handleMagCourtList,
      id: 2 
    },
    { text: "Supreme Court", handler: () => {}, id: 3 }, 
    { text: "Emergency Numbers", handler: props.actionProvider.handleNumbersList, id: 4 },
  ];

  const optionsMarkup = options.map((option) => (
    <button
      className="learning-option-button"
      key={option.id}
      onClick={option.handler}
    >
      {option.text}
    </button>
  ));

  return <div className="learning-options-container">{optionsMarkup}</div>;
};
export default LearningOptions;