import React from "react";
import { CoffeeBlock } from "./styled";

export default function Block(props) {
  return (
    <CoffeeBlock>
      <img
        src={`img/${props.fruit}.png`}
        alt=""
        style={{
          display: "table-cell",
          verticalAlign: "middle",
          width: "70px",
          height: "70px",
        }}
      />
    </CoffeeBlock>
  );
}
