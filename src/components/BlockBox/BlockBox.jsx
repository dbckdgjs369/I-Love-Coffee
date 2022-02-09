import React, { useState } from "react";
import Block from "../Block/Block";
import { Box } from "./styled";

export default function BlockBox() {
  const fruitArr = ["grape", "pear", "pineapple", "strawberry"];
  const arr = new Array(6);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(6).fill("");
  }
  const [blockArr, setArr] = useState(
    arr.map((value) =>
      value.map(() => [fruitArr[Math.floor(Math.random() * 4)], true])
    )
  );

  function bfs(fruit, index1, index2) {
    console.log(fruit + " " + index1 + " " + index2);
    let stack = new Array(36).fill("");
    let x = [0, 0, 1, -1];
    let y = [1, -1, 0, 0];
    for (let i = 0; i < 4; i++) {
      let nextx = index1 + x[i];
      let nexty = index2 + y[i];
      console.log(nextx + "," + nexty);
      if (
        nextx >= 0 &&
        nextx < 6 &&
        nexty >= 0 &&
        nexty < 6 &&
        fruitArr[nextx][nexty][1] === true
      ) {
        if (blockArr[nextx][nexty][0] === fruit) {
          console.log("asdg");
          stack.push([fruit, nextx, nexty]);
          fruitArr[nextx][nexty][1] = false;
        }
      }
    }
    console.log(stack);
    while (stack.length !== 0) {
      let temp = stack.pop();
      console.log("bfs" + temp[0] + temp[1] + temp[2]);
      bfs(temp[0], temp[1], temp[2]);
    }
  }
  return (
    <Box>
      {blockArr.map((value, index1) =>
        value.map((value2, index2) => (
          <div
            onClick={() => {
              bfs(`${value2[0]}`, index1, index2);
            }}
          >
            <Block fruit={`${value2[0]}`} />
          </div>
        ))
      )}
    </Box>
  );
}
