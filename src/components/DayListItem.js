import React from "react";

import "components/DayListItem.scss";

import classNames from "classnames";

export default function DayListItem(props) {
  const dayClass = classNames(
    "day-list__item",
    { "day-list__item--selected": props.selected },
    { "day-list__item--full": props.spots===0}
  );

  const formatSpots = ()=>{
    let text = `${props.spots} spots remaining`;
    if (props.spots===1){
      text="1 spot remaining"
    }
    if (props.spots===0){
      text="no spots remaining"
    }
    return text
  }

  return (
    <li className={dayClass} data-testid="day" onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}
