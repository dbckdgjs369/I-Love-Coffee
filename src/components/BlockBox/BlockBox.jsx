import React, { useEffect, useState } from "react";
import Block from "../Block/Block";
import { Box } from "./styled";

const MAX_LENGTH = 6;

export default function BlockBox(props) {
  const fruitArr = ["grape", "pear", "pineapple", "strawberry"];
  const arr = new Array(MAX_LENGTH);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(MAX_LENGTH).fill("");
  }
  const [blockArr, setArr] = useState(
    arr.map((value) =>
      value.map(() => [
        fruitArr[Math.floor(Math.random() * fruitArr.length)],
        true,
      ])
    )
  );
  const [combo, setCombo] = useState(props.combo);

  useEffect(() => {
    if (props.time === 500) {
      setArr(
        arr.map((value) =>
          value.map(() => [
            fruitArr[Math.floor(Math.random() * fruitArr.length)],
            true,
          ])
        )
      );
      setCombo(1);
    }
    if (nothingToChoose()) {
      alert("nothing!!");
      setArr(
        arr.map((value) =>
          value.map(() => [
            fruitArr[Math.floor(Math.random() * fruitArr.length)],
            true,
          ])
        )
      );
    }
  }, [arr]);

  let count = 1;

  function countdfs(fruit, x, y) {
    blockArr[x][y][1] = false;
    setArr([...blockArr]);
    let stack = [];
    let dx = [0, 0, 1, -1];
    let dy = [1, -1, 0, 0];
    for (let i = 0; i < 4; i++) {
      let nextx = x + dx[i];
      let nexty = y + dy[i];
      if (
        nextx >= 0 &&
        nextx < MAX_LENGTH &&
        nexty >= 0 &&
        nexty < MAX_LENGTH &&
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
      countdfs(temp[0], temp[1], temp[2]);
    }
    return count;
  }

  function dfs(fruit, x, y) {
    blockArr[x][y][1] = false;
    blockArr[x][y][0] = "none";
    setArr([...blockArr]);
    let stack = [];
    let dx = [0, 0, 1, -1];
    let dy = [1, -1, 0, 0];
    for (let i = 0; i < 4; i++) {
      let nextx = x + dx[i];
      let nexty = y + dy[i];
      if (
        nextx >= 0 &&
        nextx < MAX_LENGTH &&
        nexty >= 0 &&
        nexty < MAX_LENGTH &&
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
      dfs(temp[0], temp[1], temp[2]);
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

  function blockClicked(fruit, x, y) {
    count = 1;
    let t = countdfs(fruit, x, y);
    resetBlock();
    if (t >= 3) {
      resetBlock();
      dfs(fruit, x, y);
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
        let cdfs = countdfs(fruit, i, j);
        resetBlock();
        if (cdfs >= 3) {
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
      {blockArr.map((block, x) =>
        block.map((value, y) => (
          <div
            onClick={() => {
              blockClicked(`${value[0]}`, x, y);
            }}
          >
            <Block fruit={`${value[0]}`} />
          </div>
        ))
      )}
    </Box>
  );
}
