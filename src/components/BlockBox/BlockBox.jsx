import React, { useEffect, useState } from "react";
import Block from "../Block/Block";
import { Box } from "./styled";

export default function BlockBox(props) {
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
  const [combo, setCombo] = useState(props.combo);

  useEffect(() => {
    if (props.time === 500) {
      setArr(
        arr.map((value) =>
          value.map(() => [fruitArr[Math.floor(Math.random() * 4)], true])
        )
      );
      setCombo(1);
    }
    if (nothingToChoose()) {
      alert("nothing!!");
      setArr(
        arr.map((value) =>
          value.map(() => [fruitArr[Math.floor(Math.random() * 4)], true])
        )
      );
    }
  }, [props.time]);

  let count = 1;

  function countbfs(fruit, index1, index2) {
    blockArr[index1][index2][1] = false;
    setArr([...blockArr]);
    let stack = [];
    let x = [0, 0, 1, -1];
    let y = [1, -1, 0, 0];
    for (let i = 0; i < 4; i++) {
      let nextx = index1 + x[i];
      let nexty = index2 + y[i];
      if (
        nextx >= 0 &&
        nextx < 6 &&
        nexty >= 0 &&
        nexty < 6 &&
        blockArr[nextx][nexty][1] === true
      ) {
        if (blockArr[nextx][nexty][0] === fruit) {
          stack.push([fruit, nextx, nexty]);
          count++;
          blockArr[nextx][nexty][1] = false;
        }
      }
    }
    while (stack.length !== 0) {
      let temp = stack.pop();
      countbfs(temp[0], temp[1], temp[2]);
    }
    return count;
  }
  function bfs(fruit, index1, index2) {
    blockArr[index1][index2][1] = false;
    blockArr[index1][index2][0] = "none";
    setArr([...blockArr]);
    let stack = [];
    let x = [0, 0, 1, -1];
    let y = [1, -1, 0, 0];
    for (let i = 0; i < 4; i++) {
      let nextx = index1 + x[i];
      let nexty = index2 + y[i];
      if (
        nextx >= 0 &&
        nextx < 6 &&
        nexty >= 0 &&
        nexty < 6 &&
        blockArr[nextx][nexty][1] === true
      ) {
        if (blockArr[nextx][nexty][0] === fruit) {
          stack.push([fruit, nextx, nexty]);
          blockArr[nextx][nexty][1] = false;
        }
      }
    }
    while (stack.length !== 0) {
      let temp = stack.pop();
      bfs(temp[0], temp[1], temp[2]);
    }
  }

  function fillEmptyBlock() {
    for (let i = 0; i < blockArr.length; i++) {
      for (let j = 0; j < blockArr[0].length; j++) {
        if (blockArr[i][j][1] === false) {
          blockArr[i][j][1] = true;
        }
      }
    }
    for (let t = 0; t < blockArr.length; t++) {
      for (let i = 0; i < blockArr.length - 1; i++) {
        for (let j = 0; j < blockArr[0].length; j++) {
          if (blockArr[i + 1][j][0] === "none") {
            blockArr[i + 1][j][0] = blockArr[i][j][0];
            blockArr[i][j][0] = "none";
            setArr([...blockArr]);
          }
        }
      }
    }
    for (let i = 0; i < blockArr.length; i++) {
      for (let j = 0; j < blockArr[0].length; j++) {
        if (blockArr[i][j][0] === "none") {
          let randomNum = Math.floor(Math.random() * 4);
          blockArr[i][j][0] = fruitArr[randomNum];
          setArr([...blockArr]);
        }
      }
    }
  }
  function resetBlock() {
    for (let i = 0; i < blockArr.length; i++) {
      for (let j = 0; j < blockArr[0].length; j++) {
        if (blockArr[i][j][1] === false) {
          blockArr[i][j][1] = true;
        }
      }
    }
  }

  function blockClicked(fruit, index1, index2) {
    count = 1;
    let t = countbfs(fruit, index1, index2);
    resetBlock();
    if (t >= 3) {
      resetBlock();
      bfs(fruit, index1, index2);
      fillEmptyBlock();
      props.func(t, combo);
      setCombo((combo) => combo + 1);
    } else {
      props.func(0, 0);
      resetBlock();
      setCombo(1);
    }
  }

  function nothingToChoose() {
    let ncount = 0;
    for (let i = 0; i < blockArr.length; i++) {
      for (let j = 0; j < blockArr[0].length; j++) {
        let fruit = blockArr[i][j][0];
        count = 1;
        let cbfs = countbfs(fruit, i, j);
        resetBlock();
        if (cbfs >= 3) {
          ncount++;
        }
      }
    }
    if (ncount <= 0) {
      return true;
    } else {
      return false;
    }
  }
  return (
    <Box>
      {blockArr.map((value, index1) =>
        value.map((value2, index2) => (
          <div
            onClick={() => {
              blockClicked(`${value2[0]}`, index1, index2);
            }}
          >
            <Block fruit={`${value2[0]}`} />
          </div>
        ))
      )}
    </Box>
  );
}
