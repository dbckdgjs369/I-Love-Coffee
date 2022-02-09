import React from "react";
import { Bar, Percentage } from "./styled";

export default function ProgressBar(props) {
  return (
    <Bar>
      <Percentage style={{ width: `${props.percent}px` }}></Percentage>
    </Bar>
  );
}
