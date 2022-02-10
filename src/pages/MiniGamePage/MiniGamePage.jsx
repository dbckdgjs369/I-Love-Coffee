import React, { useEffect, useState } from "react";
import BlockBox from "../../components/BlockBox/BlockBox";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import { LowerDiv, UpperDiv } from "./styled";

export default function MiniGamePage(props) {
  const [time, setTime] = useState(500);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((time) => time - 500 / 60);
    }, 1000);
    if (time < 0) {
      alert(`GAME OVER!\n 점수: ${score}`);
      clearInterval(timer);
      setScore(0);
      setTime(500);
    }
    return () => clearInterval(timer);
  }, [time]);

  const calScore = (number) => {
    setScore((score) => score + number * Math.floor(100 - time / 60));
  };
  return (
    <div>
      Score:{score}
      <br />
      <br />
      <UpperDiv>
        <ProgressBar percent={time} />
      </UpperDiv>
      <br />
      <br />
      <LowerDiv>
        <BlockBox func={calScore}></BlockBox>
      </LowerDiv>
    </div>
  );
}
