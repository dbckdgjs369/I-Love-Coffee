import React, { useEffect, useState } from "react";
import BlockBox from "../../components/BlockBox/BlockBox";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import { LowerDiv, UpperDiv } from "./styled";

export default function MiniGamePage() {
  const [time, setTime] = useState(500);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((time) => time - 500 / 60);
    }, 1000);
    if (time < 0) {
      alert(`GAME OVER!\n점수: ${score}`);
      clearInterval(timer);
      setScore(0);
      setTime(500);
      setCombo(0);
    }
    return () => clearInterval(timer);
  }, [time]);

  const calScore = (number, combo) => {
    //부신 블록 수* 100-남은시간*combo
    setCombo(combo);
    setScore(
      (score) =>
        score +
        number * Math.floor(100 - time / 60) * Math.floor(Math.sqrt(combo, 3))
    );
  };

  return (
    <div>
      Score: {score}
      <br />
      Combo: {combo}
      <br />
      <br />
      <UpperDiv>
        <ProgressBar percent={time} />
      </UpperDiv>
      <br />
      <br />
      <LowerDiv>
        <BlockBox func={calScore} combo={combo} time={time}></BlockBox>
      </LowerDiv>
    </div>
  );
}
